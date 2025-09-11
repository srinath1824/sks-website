import React, { useState, useEffect, useCallback } from 'react';
import { Play, ChevronLeft, ChevronRight, X } from 'lucide-react';
import LazyImage from './LazyImage';

interface YouTubeVideo {
  id: string;
  title: string;
  thumbnail: string;
  publishedAt: string;
  channelTitle: string;
  videoUrl: string;
}

const YouTubeVideos = () => {
  const [videos, setVideos] = useState<YouTubeVideo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<YouTubeVideo | null>(null);
  const [playerOpen, setPlayerOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  // YouTube API configuration
  const YOUTUBE_API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY || '';
  const PLAYLIST_ID = import.meta.env.VITE_YOUTUBE_PLAYLIST_ID || '';
  const CHANNEL_HANDLE = import.meta.env.VITE_YOUTUBE_CHANNEL_HANDLE || 'SivaKundaliniSadhanaChannel';

  useEffect(() => {
    fetchYouTubeVideos();
  }, []);

  const fetchYouTubeVideos = useCallback(async () => {
    if (!YOUTUBE_API_KEY || !CHANNEL_HANDLE) {
      setError('YouTube API configuration missing');
      setLoading(false);
      return;
    }

    // Add timeout for API calls
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);

    try {
      const channelResponse = await fetch(
        `https://www.googleapis.com/youtube/v3/channels?key=${YOUTUBE_API_KEY}&forHandle=${CHANNEL_HANDLE}&part=id`,
        { signal: controller.signal }
      );
      clearTimeout(timeoutId);

      if (!channelResponse.ok) {
        throw new Error('Failed to get channel information');
      }

      const channelData = await channelResponse.json();
      if (!channelData.items || channelData.items.length === 0) {
        throw new Error('Channel not found');
      }

      const channelId = channelData.items[0].id;

      const response = PLAYLIST_ID
        ? await fetch(
            `https://www.googleapis.com/youtube/v3/playlistItems?key=${YOUTUBE_API_KEY}&playlistId=${PLAYLIST_ID}&part=snippet&maxResults=12`,
            { signal: controller.signal }
          )
        : await fetch(
            `https://www.googleapis.com/youtube/v3/search?key=${YOUTUBE_API_KEY}&channelId=${channelId}&part=snippet&order=date&maxResults=12&type=video`,
            { signal: controller.signal }
          );

      if (!response.ok) {
        throw new Error('Failed to fetch YouTube videos');
      }

      const data = await response.json();

      const videoList: YouTubeVideo[] = data.items.map((item: any) => {
        const videoId = PLAYLIST_ID ? item.snippet.resourceId.videoId : item.id.videoId;
        return {
          id: videoId,
          title: item.snippet.title,
          thumbnail: item.snippet.thumbnails.medium.url,
          publishedAt: item.snippet.publishedAt,
          channelTitle: item.snippet.channelTitle,
          videoUrl: `https://www.youtube.com/watch?v=${videoId}`,
        };
      });

      setVideos(videoList);
    } catch (err) {
      if ((err as Error).name === 'AbortError') {
        setError('Request timeout - please try again');
      } else {
        setError((err as Error).message || 'Failed to load YouTube videos');
      }
    } finally {
      setLoading(false);
    }

    return () => {
      clearTimeout(timeoutId);
      controller.abort();
    };
  }, [YOUTUBE_API_KEY, PLAYLIST_ID, CHANNEL_HANDLE]);

  const handleVideoClick = (video: YouTubeVideo) => {
    setSelectedVideo(video);
    setPlayerOpen(true);
  };

  const handleClosePlayer = () => {
    setPlayerOpen(false);
    setSelectedVideo(null);
  };

  const handleArrowClick = (direction: 'left' | 'right') => {
    const container = document.querySelector('.youtube-scroll-container');
    if (container) {
      const cardWidth = 244;
      const newScrollLeft =
        direction === 'left'
          ? Math.max(0, container.scrollLeft - cardWidth)
          : Math.min(
              container.scrollWidth - container.clientWidth,
              container.scrollLeft + cardWidth
            );
      container.scrollTo({ left: newScrollLeft, behavior: 'smooth' });
    }
    setCurrentIndex(prev =>
      direction === 'left' ? Math.max(0, prev - 1) : Math.min(videos.length - 1, prev + 1)
    );
  };

  return (
    <div className="pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-left mb-12">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            Sadhaks
            <span className="text-orange-500"> Testimonials</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl">
            Watch inspiring transformation stories and spiritual experiences shared by our students from around the world.
          </p>
        </div>

        {loading && (
          <div className="text-center py-8">
            <p className="text-gray-600">Loading YouTube videos...</p>
          </div>
        )}

        {error && (
          <div className="text-center py-8">
            <p className="text-red-600">{error}</p>
          </div>
        )}

        {!loading && !error && (
        <div className="relative">
          {/* Left Arrow */}
          {videos.length > 4 && currentIndex > 0 && (
            <button
              onClick={() => handleArrowClick('left')}
              className="absolute left-[-20px] top-1/2 transform -translate-y-1/2 w-10 h-10 bg-orange-500 text-white rounded-full opacity-70 hover:opacity-100 hover:bg-orange-600 transition-all duration-200 z-10 flex items-center justify-center"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
          )}

          {/* Right Arrow */}
          {videos.length > 4 && currentIndex < videos.length - 4 && (
            <button
              onClick={() => handleArrowClick('right')}
              className="absolute right-[-20px] top-1/2 transform -translate-y-1/2 w-10 h-10 bg-orange-500 text-white rounded-full opacity-70 hover:opacity-100 hover:bg-orange-600 transition-all duration-200 z-10 flex items-center justify-center"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          )}

          {/* Videos Container */}
          <div
            className="youtube-scroll-container overflow-x-auto scrollbar-hide"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            <div className="flex gap-6 pb-2">
              {videos.map((video) => (
                <div
                  key={video.id}
                  className="w-56 flex-shrink-0 cursor-pointer group"
                  onClick={() => handleVideoClick(video)}
                >
                  <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden">
                    <div className="relative">
                      <LazyImage
                        src={video.thumbnail}
                        alt={video.title}
                        className="w-full h-36 object-cover"
                      />
                      <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="bg-orange-500/90 text-white rounded-full p-2 group-hover:bg-orange-500 transition-all duration-300">
                          <Play className="h-6 w-6 fill-current" />
                        </div>
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-900 mb-2 text-sm leading-tight line-clamp-2">
                        {video.title}
                      </h3>
                      <p className="text-xs text-gray-500">
                        {new Date(video.publishedAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        )}

        {!loading && !error && videos.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-600">No videos available at the moment.</p>
          </div>
        )}

        {/* YouTube Player Modal */}
        {playerOpen && selectedVideo && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
            <div className="bg-black rounded-lg max-w-4xl w-full relative">
              <button
                onClick={handleClosePlayer}
                className="absolute top-2 right-2 text-white bg-black/50 hover:bg-black/70 rounded-full p-2 z-10 transition-colors duration-200"
              >
                <X className="h-5 w-5" />
              </button>
              <div className="relative pb-[56.25%] h-0">
                <iframe
                  src={`https://www.youtube.com/embed/${selectedVideo.id}?autoplay=1&rel=0&modestbranding=1`}
                  title={selectedVideo.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute top-0 left-0 w-full h-full rounded-lg"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default YouTubeVideos;