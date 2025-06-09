import { Box, Typography, Container, Button, useTheme, useMediaQuery } from '@mui/material';
import { motion } from 'framer-motion';
import { Link as RouterLink } from 'react-router-dom';
import CodeIcon from '@mui/icons-material/Code';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';

const MotionBox = motion(Box);

const Home = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isDark = theme.palette.mode === 'dark';

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <Box
      sx={{
        height: 'calc(100vh - 72px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        background: isDark
          ? 'linear-gradient(135deg, #181a20 0%, #23272f 100%)'
          : 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
      }}
    >
      <MotionBox
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        sx={{
          width: '100%',
          maxWidth: 900,
          mx: 'auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          py: { xs: 6, md: 10 },
          px: { xs: 2, sm: 4, md: 6 },
        }}
      >
        <MotionBox variants={itemVariants}>
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: '2.5rem', md: '4rem' },
              fontWeight: 800,
              mb: 2,
              background: 'linear-gradient(45deg, #2563eb 30%, #7c3aed 90%)',
              backgroundClip: 'text',
              textFillColor: 'transparent',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              letterSpacing: '-1px'
            }}
          >
            BugraCNTP
          </Typography>
        </MotionBox>

        <MotionBox variants={itemVariants}>
          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: '1.5rem', md: '2rem' },
              color: 'text.secondary',
              mb: 4,
              maxWidth: '800px',
              mx: 'auto',
              lineHeight: 1.5
            }}
          >
            Full Stack Geliştirici & Open Source Katkıdaş
          </Typography>
        </MotionBox>

        <MotionBox
          variants={itemVariants}
          sx={{
            display: 'flex',
            gap: 2,
            flexWrap: 'wrap',
            justifyContent: 'center',
            mb: 6
          }}
        >
          <Button
            component={RouterLink}
            to="/projects"
            variant="contained"
            size="large"
            startIcon={<CodeIcon />}
            sx={{
              px: 4,
              py: 1.5,
              borderRadius: 2,
              background: 'linear-gradient(45deg, #2563eb 30%, #7c3aed 90%)',
              '&:hover': {
                background: 'linear-gradient(45deg, #1d4ed8 30%, #6d28d9 90%)',
              }
            }}
          >
            Projelerimi Gör
          </Button>
          <Button
            component={RouterLink}
            to="/contact"
            variant="outlined"
            size="large"
            startIcon={<EmailIcon />}
            sx={{
              px: 4,
              py: 1.5,
              borderRadius: 2,
              borderWidth: 2,
              '&:hover': {
                borderWidth: 2,
              }
            }}
          >
            İletişime Geç
          </Button>
        </MotionBox>

        <MotionBox
          variants={itemVariants}
          sx={{
            display: 'flex',
            gap: 3,
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}
        >
          <Button
            href="https://github.com/bugracntp"
            target="_blank"
            rel="noopener noreferrer"
            startIcon={<GitHubIcon />}
            sx={{
              color: 'text.secondary',
              '&:hover': {
                color: 'primary.main',
                background: 'rgba(37,99,235,0.1)'
              }
            }}
          >
            GitHub
          </Button>
          <Button
            href="https://linkedin.com/in/bugracntp"
            target="_blank"
            rel="noopener noreferrer"
            startIcon={<LinkedInIcon />}
            sx={{
              color: 'text.secondary',
              '&:hover': {
                color: 'primary.main',
                background: 'rgba(37,99,235,0.1)'
              }
            }}
          >
            LinkedIn
          </Button>
        </MotionBox>

        <MotionBox
          variants={itemVariants}
          sx={{
            mt: 8,
            p: { xs: 2, sm: 3, md: 4 },
            borderRadius: 3,
            background: isDark ? 'rgba(35,39,47,0.95)' : 'rgba(255,255,255,0.95)',
            boxShadow: isDark ? '0 2px 16px rgba(0,0,0,0.32)' : '0 2px 16px rgba(0,0,0,0.04)',
            maxWidth: '100%',
            width: '100%'
          }}
        >
          <Typography
            variant="h3"
            sx={{
              fontSize: { xs: '1.5rem', md: '2rem' },
              mb: 2,
              fontWeight: 600
            }}
          >
            Hakkımda
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: 'text.secondary',
              lineHeight: 1.8,
              fontSize: { xs: '1rem', md: '1.1rem' }
            }}
          >
            Merhaba! Ben Bugra, Full Stack geliştirici olarak çalışıyorum. Modern web teknolojileri ve 
            açık kaynak projelere katkıda bulunmayı seviyorum. React, TypeScript ve Node.js ile 
            kullanıcı dostu ve performanslı uygulamalar geliştiriyorum.
          </Typography>
        </MotionBox>
      </MotionBox>
    </Box>
  );
};

export default Home; 