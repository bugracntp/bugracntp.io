import { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardActionArea,
  Container,
  Chip,
  Skeleton,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { motion } from 'framer-motion';
import CodeIcon from '@mui/icons-material/Code';
import GitHubIcon from '@mui/icons-material/GitHub';
import StarIcon from '@mui/icons-material/Star';
import ForkRightIcon from '@mui/icons-material/ForkRight';

interface Repository {
  name: string;
  description: string;
  html_url: string;
  language: string;
  stargazers_count: number;
  forks_count: number;
}

const MotionCard = motion(Card);

const Projects = () => {
  const [repos, setRepos] = useState<Repository[]>([]);
  const [loading, setLoading] = useState(true);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const response = await fetch('https://api.github.com/users/bugracntp/repos');
        const data = await response.json();
        setRepos(data);
      } catch (error) {
        console.error('Repolar yüklenirken hata oluştu:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRepos();
  }, []);

  return (
    <Box sx={{ 
      minHeight: '100vh',
      background: 'linear-gradient(180deg, rgba(37,99,235,0.05) 0%, rgba(37,99,235,0) 100%)',
      py: 8
    }}>
      <Container maxWidth="lg">
        <Box sx={{ 
          textAlign: 'center', 
          mb: 8,
          px: isMobile ? 2 : 4
        }}>
          <Typography 
            variant="h2" 
            component="h1" 
            gutterBottom
            sx={{
              background: 'linear-gradient(45deg, #2563eb 30%, #7c3aed 90%)',
              backgroundClip: 'text',
              textFillColor: 'transparent',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontSize: isMobile ? '2.5rem' : '3.5rem',
            }}
          >
            Projelerim
          </Typography>
          <Typography 
            variant="h5" 
            color="text.secondary" 
            sx={{ 
              maxWidth: '800px', 
              mx: 'auto',
              fontSize: isMobile ? '1.1rem' : '1.25rem',
            }}
          >
            GitHub üzerindeki açık kaynak projelerim ve çalışmalarım
          </Typography>
        </Box>

        <Box sx={{ 
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            sm: 'repeat(2, 1fr)',
            md: 'repeat(3, 1fr)'
          },
          gap: 4,
          justifyContent: 'center'
        }}>
          {loading ? (
            // Loading skeletons
            Array.from(new Array(6)).map((_, index) => (
              <Box key={index}>
                <Card sx={{ 
                  height: '100%',
                  borderRadius: 4,
                  boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                }}>
                  <CardContent sx={{ p: 3 }}>
                    <Skeleton variant="text" width="60%" height={40} />
                    <Skeleton variant="text" width="100%" />
                    <Skeleton variant="text" width="100%" />
                    <Skeleton variant="text" width="40%" />
                  </CardContent>
                </Card>
              </Box>
            ))
          ) : (
            // Repository cards
            repos.map((repo) => (
              <Box key={repo.name}>
                <MotionCard
                  sx={{ 
                    height: '100%',
                    borderRadius: 4,
                    boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                    transition: 'all 0.3s ease-in-out',
                    '&:hover': {
                      boxShadow: '0 8px 30px rgba(0,0,0,0.1)',
                    }
                  }}
                  whileHover={{ y: -8 }}
                  transition={{ duration: 0.3 }}
                >
                  <CardActionArea
                    component="a"
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{ height: '100%' }}
                  >
                    <CardContent sx={{ p: 3 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <GitHubIcon sx={{ mr: 1, color: 'text.secondary' }} />
                        <Typography 
                          variant="h5" 
                          component="h2" 
                          sx={{ 
                            fontWeight: 600,
                            fontSize: isMobile ? '1.25rem' : '1.5rem',
                          }}
                        >
                          {repo.name}
                        </Typography>
                      </Box>
                      <Typography
                        color="text.secondary"
                        sx={{
                          mb: 3,
                          display: '-webkit-box',
                          WebkitLineClamp: 3,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden',
                          fontSize: isMobile ? '0.9rem' : '1rem',
                          lineHeight: 1.6,
                        }}
                      >
                        {repo.description || 'Açıklama bulunmuyor.'}
                      </Typography>
                      <Box sx={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'space-between',
                        flexWrap: 'wrap',
                        gap: 1
                      }}>
                        {repo.language && (
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <CodeIcon sx={{ fontSize: 20, color: 'text.secondary' }} />
                            <Chip
                              label={repo.language}
                              size="small"
                              sx={{
                                bgcolor: 'primary.light',
                                color: 'white',
                                '&:hover': {
                                  bgcolor: 'primary.main',
                                },
                              }}
                            />
                          </Box>
                        )}
                        <Box sx={{ display: 'flex', gap: 2 }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            <StarIcon sx={{ fontSize: 18, color: 'text.secondary' }} />
                            <Typography variant="body2" color="text.secondary">
                              {repo.stargazers_count}
                            </Typography>
                          </Box>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            <ForkRightIcon sx={{ fontSize: 18, color: 'text.secondary' }} />
                            <Typography variant="body2" color="text.secondary">
                              {repo.forks_count}
                            </Typography>
                          </Box>
                        </Box>
                      </Box>
                    </CardContent>
                  </CardActionArea>
                </MotionCard>
              </Box>
            ))
          )}
        </Box>
      </Container>
    </Box>
  );
};

export default Projects; 