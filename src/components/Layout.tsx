import type { ReactNode } from 'react';
import { useState } from 'react';
import { AppBar, Toolbar, Typography, Container, Box, Button, IconButton, Drawer, List, ListItem, ListItemText, useTheme, useMediaQuery } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { Link } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

interface LayoutProps {
  children: ReactNode;
  mode: 'light' | 'dark';
  setMode: (mode: 'light' | 'dark') => void;
}

const Layout = ({ children, mode, setMode }: LayoutProps) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const menuItems = [
    { text: 'Ana Sayfa', path: '/' },
    { text: 'Hakkımda', path: '/about' },
    { text: 'Projeler', path: '/projects' },
    { text: 'Deneyimlerim', path: '/experience' },
    { text: 'İletişim', path: '/contact' },
  ];

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        BugraCNTP
      </Typography>
      <List>
        {menuItems.map((item) => (
          <ListItem key={item.text} component={RouterLink} to={item.path}>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AppBar position="sticky" color="default" elevation={0} sx={{
        backdropFilter: 'blur(8px)',
        bgcolor: mode === 'dark' ? 'rgba(35, 39, 47, 0.95)' : 'rgba(255, 255, 255, 0.8)',
        boxShadow: mode === 'dark' ? '0 2px 10px rgba(0,0,0,0.25)' : '0 2px 10px rgba(0,0,0,0.05)',
        width: '100vw',
        left: 0
      }}>
        <Container maxWidth={false} disableGutters sx={{ maxWidth: '100vw', px: { xs: 2, md: 6 } }}>
          <Toolbar disableGutters sx={{ justifyContent: 'center', minHeight: 72 }}>
            <Box sx={{ flexGrow: 1 }} />
            <Typography
              variant="h6"
              component={RouterLink}
              to="/"
              sx={{
                textDecoration: 'none',
                color: mode === 'dark' ? 'primary.light' : 'primary.main',
                fontWeight: 700,
                letterSpacing: '-0.5px',
                mx: 2,
              }}
            >
              BugraCNTP
            </Typography>
            {isMobile ? (
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="end"
                onClick={handleDrawerToggle}
                sx={{ ml: 2 }}
              >
                <MenuIcon />
              </IconButton>
            ) : (
              <Box sx={{ display: 'flex', gap: 2, ml: 2 }}>
                {menuItems.map((item) => (
                  <Button
                    key={item.text}
                    component={RouterLink}
                    to={item.path}
                    color="inherit"
                    sx={{
                      fontWeight: 500,
                      '&:hover': {
                        color: 'primary.main',
                      },
                    }}
                  >
                    {item.text}
                  </Button>
                ))}
              </Box>
            )}
            <IconButton
              sx={{ ml: 2, position: 'absolute', right: 24, top: 16 }}
              onClick={() => setMode(mode === 'light' ? 'dark' : 'light')}
              color="inherit"
            >
              {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
            <Box sx={{ flexGrow: 1 }} />
          </Toolbar>
        </Container>
      </AppBar>

      <Drawer
        variant="temporary"
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 },
        }}
      >
        {drawer}
      </Drawer>

      <Container component="main" sx={{ flexGrow: 1, py: 4 }}>
        {children}
      </Container>

      <Box 
        component="footer" 
        sx={{ 
          py: 4,
          bgcolor: 'background.paper',
          borderTop: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
            <Typography variant="body2" color="text.secondary">
              © {new Date().getFullYear()} BugraCNTP. Tüm hakları saklıdır.
            </Typography>
            <Box sx={{ display: 'flex', gap: 2 }}>
              {menuItems.map((item) => (
                <Link
                  key={item.text}
                  component={RouterLink}
                  to={item.path}
                  color="text.secondary"
                  sx={{ textDecoration: 'none', '&:hover': { color: 'primary.main' } }}
                >
                  {item.text}
                </Link>
              ))}
            </Box>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default Layout; 