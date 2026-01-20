'use client';

import { useState, useMemo } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { videos, videoCategories, videoCollections, type Video } from '@/lib/data/videos';
import FocusTrap from './FocusTrap';
import {
  Box,
  Flex,
  Heading,
  Text,
  Button,
  Grid,
  Badge,
  Spinner,
} from '@chakra-ui/react';
import { 
  Play, Clock, User, X, ChevronRight, Lock, 
  BookOpen, Mic, Dumbbell, Lightbulb, Brain
} from 'lucide-react';
import dynamic from 'next/dynamic';

const ReactPlayer = dynamic(() => import('react-player'), { ssr: false });

// Category icons mapping for future use
const _categoryIcons: Record<string, typeof Play> = {
  'protocol-guides': BookOpen,
  'science-deep-dives': Brain,
  'breathwork-sessions': BookOpen,
  'movement-routines': Dumbbell,
  'expert-interviews': Mic,
  'quick-tips': Lightbulb,
  'meditation': Brain,
};
void _categoryIcons; // Suppress unused warning

export default function VideoLibrary() {
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [activeDifficulty, setActiveDifficulty] = useState<string>('all');
  const [showCollections, setShowCollections] = useState(false);
  const [videoLoading, setVideoLoading] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const categories = ['all', ...Object.keys(videoCategories)];
  const difficulties = ['all', 'beginner', 'intermediate', 'advanced'];

  const filteredVideos = useMemo(() => {
    return videos.filter(v => {
      const categoryMatch = activeCategory === 'all' || v.category === activeCategory;
      const difficultyMatch = activeDifficulty === 'all' || v.difficulty === activeDifficulty;
      return categoryMatch && difficultyMatch;
    });
  }, [activeCategory, activeDifficulty]);

  const featuredVideos = useMemo(() => videos.filter(v => v.featured), []);

  const formatDuration = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    if (hours > 0) return `${hours}h ${minutes}m`;
    return `${minutes} min`;
  };

  const getCategoryMeta = (category: string) => {
    return videoCategories[category as keyof typeof videoCategories] || {
      name: category,
      icon: '📹'
    };
  };

  return (
    <>
      {/* Video Player Modal */}
      {selectedVideo && (
        <FocusTrap
          active={true}
          focusTrapOptions={{
            onDeactivate: () => setSelectedVideo(null),
            clickOutsideDeactivates: true,
            escapeDeactivates: true,
          }}
        >
          <Box
            position="fixed"
            inset={0}
            zIndex={50}
            bg="primary.900/98"
            backdropFilter="blur(20px)"
            display="flex"
            flexDir="column"
            role="dialog"
            aria-modal="true"
            aria-labelledby="video-player-title"
          >
            {/* Header */}
            <Flex
              align="center"
              justify="space-between"
              px={{ base: 4, sm: 6 }}
              py={4}
              borderBottom="1px solid"
              borderColor="primary.400/30"
            >
              <Box>
                <Heading as="h2" id="video-player-title" size={{ base: 'sm', md: 'md' }} color="white" lineClamp={1}>
                  {selectedVideo.title}
                </Heading>
                <Flex align="center" gap={3} mt={1}>
                  <Flex align="center" gap={1}>
                    <Box as={User} w={4} h={4} color="whiteAlpha.500" />
                    <Text color="whiteAlpha.500" fontSize="sm">{selectedVideo.instructor}</Text>
                  </Flex>
                  <Flex align="center" gap={1}>
                    <Box as={Clock} w={4} h={4} color="whiteAlpha.500" />
                    <Text color="whiteAlpha.500" fontSize="sm">{formatDuration(selectedVideo.duration)}</Text>
                  </Flex>
                </Flex>
              </Box>
              <Button
                onClick={() => setSelectedVideo(null)}
                aria-label="Close video player"
                w={10}
                h={10}
                borderRadius="full"
                bg="primary.700/50"
                color="whiteAlpha.700"
                _hover={{ bg: 'primary.700', color: 'white' }}
                _focus={{ ring: 2, ringColor: 'accent.400' }}
              >
                <Box as={X} w={5} h={5} />
              </Button>
            </Flex>

            {/* Video Player */}
            <Flex flex={1} align="center" justify="center" p={{ base: 4, sm: 6 }} position="relative">
              {videoLoading && (
                <Flex
                  position="absolute"
                  inset={0}
                  align="center"
                  justify="center"
                  bg="primary.900/80"
                  zIndex={10}
                >
                  <Spinner size="xl" color="accent.400" />
                </Flex>
              )}
              <Box
                w="full"
                maxW="1200px"
                position="relative"
                borderRadius="xl"
                overflow="hidden"
                bg="black"
                aspectRatio={16/9}
              >
                {selectedVideo.premium ? (
                  <Flex
                    position="absolute"
                    inset={0}
                    bg="primary.800"
                    align="center"
                    justify="center"
                    flexDir="column"
                    gap={4}
                  >
                    <Flex
                      w={16}
                      h={16}
                      bg="accent.500/20"
                      borderRadius="full"
                      align="center"
                      justify="center"
                    >
                      <Box as={Lock} w={8} h={8} color="accent.400" />
                    </Flex>
                    <Heading as="h3" size="lg" color="white">Premium Content</Heading>
                    <Text color="whiteAlpha.600" textAlign="center" maxW="md">
                      Upgrade to access this and all premium videos
                    </Text>
                    <Button
                      bgGradient="linear(to-r, accent.500, accent.600)"
                      color="white"
                      px={8}
                      py={3}
                      borderRadius="full"
                      fontWeight="semibold"
                      boxShadow="lg"
                      _hover={{ bgGradient: 'linear(to-r, accent.600, accent.700)' }}
                    >
                      Upgrade Now
                    </Button>
                  </Flex>
                ) : (
                  <ReactPlayer
                    {...{
                      url: selectedVideo.videoUrl || 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
                      width: '100%',
                      height: '100%',
                      controls: true,
                      playing: true,
                      onReady: () => setVideoLoading(false),
                      onBuffer: () => setVideoLoading(true),
                      onBufferEnd: () => setVideoLoading(false)
                    } as React.ComponentProps<typeof ReactPlayer>}
                  />
                )}
              </Box>
            </Flex>

            {/* Video Info */}
            <Box
              px={{ base: 4, sm: 6 }}
              py={4}
              borderTop="1px solid"
              borderColor="primary.400/30"
              maxW="1200px"
              mx="auto"
              w="full"
            >
              <Text color="whiteAlpha.700" fontSize="sm" mb={3}>
                {selectedVideo.description}
              </Text>
              <Flex gap={2} flexWrap="wrap">
                {selectedVideo.topics.map((topic) => (
                  <Badge
                    key={topic}
                    px={2}
                    py={1}
                    bg="primary.700/50"
                    color="whiteAlpha.600"
                    borderRadius="md"
                    fontSize="xs"
                  >
                    {topic}
                  </Badge>
                ))}
              </Flex>
            </Box>
          </Box>
        </FocusTrap>
      )}

      <Flex direction="column" gap={{ base: 6, sm: 8 }}>
        {/* Featured Section */}
        {!showCollections && activeCategory === 'all' && activeDifficulty === 'all' && (
          <Box>
            <Heading as="h2" size={{ base: 'md', sm: 'lg' }} color="white" mb={4}>
              Featured Videos
            </Heading>
            <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }} gap={4}>
              {featuredVideos.slice(0, 3).map((video, index) => (
                <motion.div
                  key={video.id}
                  initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={shouldReduceMotion ? { duration: 0.1 } : { delay: index * 0.1 }}
                >
                  <VideoCard video={video} onClick={() => setSelectedVideo(video)} formatDuration={formatDuration} />
                </motion.div>
              ))}
            </Grid>
          </Box>
        )}

        {/* View Toggle */}
        <Flex
          bg="primary.700/50"
          borderRadius="xl"
          p={1}
          w="fit-content"
        >
          <Button
            onClick={() => setShowCollections(false)}
            px={4}
            py={2}
            borderRadius="lg"
            fontSize="sm"
            fontWeight="medium"
            bg={!showCollections ? 'accent.500/20' : 'transparent'}
            color={!showCollections ? 'accent.300' : 'whiteAlpha.600'}
            _hover={{ color: 'white' }}
          >
            All Videos
          </Button>
          <Button
            onClick={() => setShowCollections(true)}
            px={4}
            py={2}
            borderRadius="lg"
            fontSize="sm"
            fontWeight="medium"
            bg={showCollections ? 'accent.500/20' : 'transparent'}
            color={showCollections ? 'accent.300' : 'whiteAlpha.600'}
            _hover={{ color: 'white' }}
          >
            Collections
          </Button>
        </Flex>

        {!showCollections ? (
          <>
            {/* Filters */}
            <Box>
              <Text color="whiteAlpha.600" fontSize="sm" mb={2} fontWeight="medium">
                Category
              </Text>
              <Flex
                gap={2}
                overflowX="auto"
                pb={2}
                mb={4}
                css={{
                  '&::-webkit-scrollbar': { display: 'none' },
                  scrollbarWidth: 'none'
                }}
              >
                {categories.map((category) => {
                  const meta = category !== 'all' ? getCategoryMeta(category) : null;
                  return (
                    <Button
                      key={category}
                      onClick={() => setActiveCategory(category)}
                      aria-pressed={activeCategory === category}
                      px={3}
                      py={2}
                      borderRadius="full"
                      fontSize="xs"
                      whiteSpace="nowrap"
                      bg={activeCategory === category ? 'accent.500/20' : 'primary.600/50'}
                      borderWidth="1px"
                      borderColor={activeCategory === category ? 'accent.500' : 'primary.400'}
                      color={activeCategory === category ? 'accent.300' : 'whiteAlpha.600'}
                      _hover={{ bg: activeCategory === category ? 'accent.500/30' : 'primary.600/70' }}
                      _focus={{ ring: 2, ringColor: 'accent.400' }}
                    >
                      {meta && <Text mr={1.5}>{meta.icon}</Text>}
                      {category === 'all' ? 'All' : meta?.name}
                    </Button>
                  );
                })}
              </Flex>

              <Text color="whiteAlpha.600" fontSize="sm" mb={2} fontWeight="medium">
                Difficulty
              </Text>
              <Flex gap={2} flexWrap="wrap">
                {difficulties.map((diff) => (
                  <Button
                    key={diff}
                    onClick={() => setActiveDifficulty(diff)}
                    aria-pressed={activeDifficulty === diff}
                    px={3}
                    py={1.5}
                    borderRadius="full"
                    fontSize="xs"
                    textTransform="capitalize"
                    bg={activeDifficulty === diff ? 'accent.500/20' : 'transparent'}
                    borderWidth="1px"
                    borderColor={activeDifficulty === diff ? 'accent.500' : 'primary.400'}
                    color={activeDifficulty === diff ? 'accent.300' : 'whiteAlpha.600'}
                    _hover={{ bg: activeDifficulty === diff ? 'accent.500/30' : 'primary.600/50' }}
                    _focus={{ ring: 2, ringColor: 'accent.400' }}
                  >
                    {diff === 'all' ? 'All Levels' : diff}
                  </Button>
                ))}
              </Flex>
            </Box>

            {/* Results */}
            <Text color="whiteAlpha.500" fontSize="sm">
              Showing {filteredVideos.length} video{filteredVideos.length !== 1 ? 's' : ''}
            </Text>

            {/* Videos Grid */}
            <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }} gap={4}>
              {filteredVideos.map((video, index) => (
                <motion.div
                  key={video.id}
                  initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={shouldReduceMotion ? { duration: 0.1 } : { delay: index * 0.03, duration: 0.3 }}
                >
                  <VideoCard
                    video={video}
                    onClick={() => setSelectedVideo(video)}
                    formatDuration={formatDuration}
                  />
                </motion.div>
              ))}
            </Grid>
          </>
        ) : (
          /* Collections View */
          <Grid templateColumns={{ base: '1fr', lg: 'repeat(2, 1fr)' }} gap={4}>
            {videoCollections.map((collection, index) => (
              <motion.div
                key={collection.id}
                initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={shouldReduceMotion ? { duration: 0.1 } : { delay: index * 0.05 }}
              >
                <Box
                  bg="primary.600/50"
                  borderWidth="1px"
                  borderColor="primary.400"
                  borderRadius="2xl"
                  p={{ base: 5, sm: 6 }}
                  _hover={{ borderColor: 'primary.300' }}
                  transition="all 0.3s"
                >
                  <Heading as="h3" size="md" color="white" mb={2}>
                    {collection.name}
                  </Heading>
                  <Text color="whiteAlpha.600" fontSize="sm" mb={4}>
                    {collection.description}
                  </Text>

                  <Flex direction="column" gap={2}>
                    {collection.videoIds.slice(0, 3).map((videoId) => {
                      const video = videos.find(v => v.id === videoId);
                      if (!video) return null;
                      return (
                        <Button
                          key={videoId}
                          onClick={() => setSelectedVideo(video)}
                          w="full"
                          justifyContent="space-between"
                          bg="primary.700/50"
                          borderRadius="lg"
                          px={3}
                          py={2}
                          h="auto"
                          _hover={{ bg: 'primary.700' }}
                          _focus={{ ring: 2, ringColor: 'accent.400' }}
                        >
                          <Flex align="center" gap={2}>
                            <Box as={Play} w={4} h={4} color="accent.400" />
                            <Text color="white" fontSize="sm" fontWeight="medium" lineClamp={1}>
                              {video.title}
                            </Text>
                          </Flex>
                          <Text color="whiteAlpha.400" fontSize="xs">
                            {formatDuration(video.duration)}
                          </Text>
                        </Button>
                      );
                    })}
                    {collection.videoIds.length > 3 && (
                      <Button
                        variant="ghost"
                        color="accent.300"
                        fontSize="sm"
                        fontWeight="medium"
                        justifyContent="flex-start"
                        px={3}
                        _hover={{ color: 'accent.200' }}
                      >
                        +{collection.videoIds.length - 3} more videos
                        <Box as={ChevronRight} w={4} h={4} ml={1} />
                      </Button>
                    )}
                  </Flex>
                </Box>
              </motion.div>
            ))}
          </Grid>
        )}
      </Flex>
    </>
  );
}

interface VideoCardProps {
  video: Video;
  onClick: () => void;
  formatDuration: (seconds: number) => string;
}

function VideoCard({ video, onClick, formatDuration }: VideoCardProps) {
  const getCategoryMeta = (category: string) => {
    return videoCategories[category as keyof typeof videoCategories] || { name: category, icon: '📹' };
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'green';
      case 'intermediate': return 'yellow';
      case 'advanced': return 'red';
      default: return 'gray';
    }
  };

  return (
    <Button
      onClick={onClick}
      w="full"
      h="auto"
      p={0}
      bg="primary.600/50"
      borderWidth="1px"
      borderColor="primary.400"
      borderRadius="xl"
      overflow="hidden"
      _hover={{ borderColor: 'primary.300', transform: 'translateY(-2px)' }}
      _focus={{ ring: 2, ringColor: 'accent.400' }}
      transition="all 0.3s"
      textAlign="left"
      display="block"
    >
      {/* Thumbnail */}
      <Box position="relative" aspectRatio={16/9} bg="primary.800">
        <Flex
          position="absolute"
          inset={0}
          align="center"
          justify="center"
          bg="blackAlpha.600"
          opacity={0}
          _groupHover={{ opacity: 1 }}
          transition="opacity 0.3s"
        >
          <Flex
            w={14}
            h={14}
            bg="accent.500"
            borderRadius="full"
            align="center"
            justify="center"
          >
            <Box as={Play} w={6} h={6} color="white" ml={1} />
          </Flex>
        </Flex>

        {/* Duration Badge */}
        <Badge
          position="absolute"
          bottom={2}
          right={2}
          bg="blackAlpha.700"
          color="white"
          px={2}
          py={0.5}
          borderRadius="md"
          fontSize="xs"
        >
          {formatDuration(video.duration)}
        </Badge>

        {/* Premium Badge */}
        {video.premium && (
          <Badge
            position="absolute"
            top={2}
            left={2}
            bg="accent.500"
            color="white"
            px={2}
            py={0.5}
            borderRadius="md"
            fontSize="xs"
          >
            <Flex align="center" gap={1}>
              <Box as={Lock} w={3} h={3} />
              Premium
            </Flex>
          </Badge>
        )}
      </Box>

      {/* Content */}
      <Box p={4}>
        <Flex gap={2} mb={2}>
          <Badge
            px={2}
            py={0.5}
            bg="accent.500/20"
            color="accent.200"
            borderRadius="md"
            fontSize="10px"
          >
            {getCategoryMeta(video.category).name}
          </Badge>
          <Badge
            px={2}
            py={0.5}
            bg={`${getDifficultyColor(video.difficulty)}.500/20`}
            color={`${getDifficultyColor(video.difficulty)}.300`}
            borderRadius="md"
            fontSize="10px"
            textTransform="capitalize"
          >
            {video.difficulty}
          </Badge>
        </Flex>

        <Heading as="h3" size="sm" color="white" mb={1} lineClamp={2}>
          {video.title}
        </Heading>

        <Text color="whiteAlpha.500" fontSize="xs" lineClamp={2}>
          {video.description}
        </Text>

        <Flex align="center" gap={1} mt={2}>
          <Box as={User} w={3} h={3} color="whiteAlpha.400" />
          <Text color="whiteAlpha.400" fontSize="xs">
            {video.instructor}
          </Text>
        </Flex>
      </Box>
    </Button>
  );
}
