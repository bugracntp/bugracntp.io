import { Box, Typography, Container, Paper, Avatar, useTheme, Chip, Stack } from '@mui/material';
import WorkIcon from '@mui/icons-material/Work';
import SchoolIcon from '@mui/icons-material/School';
import BusinessIcon from '@mui/icons-material/Business';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import LocationOnIcon from '@mui/icons-material/LocationOn';

const experiences = [
  {
    company: 'Customer Experience Ltd.',
    position: 'Software Support Specialist',
    date: 'Jan 2025 – Present (6 ay)',
    location: 'Remote',
    type: 'Full-time',
    description: '',
    skills: ['Software Development', 'ASP.NET'],
    icon: <BusinessIcon />,
  },
  {
    company: 'Doğuş Teknoloji',
    position: 'Jr. Software Engineer',
    date: 'Jul 2024 – Jan 2025 (7 ay)',
    location: 'İstanbul, Türkiye',
    type: 'Full-time',
    description: 'Hybee Project, React Native, SQL/TSQL, Entity Framework, ASP.NET',
    skills: ['React Native', 'SQL/TSQL', 'Entity Framework', 'ASP.NET'],
    icon: <BusinessIcon />,
  },
  {
    company: 'Doğuş Teknoloji',
    position: 'Jr. Software Developer',
    date: 'Aug 2023 – Jul 2024 (1 yıl)',
    location: 'Remote',
    type: 'Full-time',
    description: 'Hybee Project, React Native, SQL/TSQL, Entity Framework, ASP.NET',
    skills: ['React Native', 'SQL/TSQL', 'Entity Framework', 'ASP.NET'],
    icon: <BusinessIcon />,
  },
  {
    company: 'Rysoft',
    position: 'Intern',
    date: 'Jul 2023 – Jul 2023 (1 ay)',
    location: 'Ankara, Türkiye · Remote',
    type: 'Full-time',
    description: '',
    skills: ['Software Development', 'ASP.NET'],
    icon: <WorkIcon />,
  },
  {
    company: 'AGE Bilişim Sistemleri ve Otomasyon Faaliyetleri',
    position: 'Intern',
    date: 'Jun 2022 – Jun 2022 (1 ay)',
    location: 'Ankara, Türkiye',
    type: 'Internship',
    description: '',
    skills: ['English', 'Software Development', 'ASP.NET'],
    icon: <WorkIcon />,
  },
];

const education = {
  school: 'Firat University',
  degree: 'Lisans Derecesi, Bilgisayar Yazılımı Mühendisliği',
  date: '2019 – 2024',
  skills: ['ASP.NET', 'Software Development'],
  icon: <SchoolIcon />,
};

const Experience = () => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  return (
    <Container maxWidth="md" sx={{ py: 8 }}>
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
          textAlign: 'center',
          mb: 6,
        }}
      >
        Deneyimlerim
      </Typography>
      <Timeline position="alternate">
        {experiences.map((exp, idx) => (
          <TimelineItem key={idx}>
            <TimelineSeparator>
              <TimelineDot color={idx === 0 ? 'primary' : 'secondary'}>
                {exp.icon}
              </TimelineDot>
              {idx < experiences.length - 1 && <TimelineConnector />}
            </TimelineSeparator>
            <TimelineContent sx={{ maxWidth: { xs: '100%', sm: 400 } }}>
              <Paper elevation={3} sx={{ p: 3, mb: 2, bgcolor: isDark ? 'background.paper' : '#fff' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                  <Avatar sx={{ bgcolor: idx === 0 ? 'primary.main' : 'secondary.main', color: '#fff' }}>
                    {exp.company[0]}
                  </Avatar>
                  <Box>
                    <Typography variant="h6" fontWeight={700}>{exp.company}</Typography>
                    <Typography variant="subtitle2" color="text.secondary">{exp.position} <span style={{ fontWeight: 400 }}>· {exp.type}</span></Typography>
                  </Box>
                </Box>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>{exp.date}</Typography>
                {exp.location && (
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                    <LocationOnIcon sx={{ fontSize: 18, color: 'text.secondary' }} />
                    <Typography variant="body2" color="text.secondary">{exp.location}</Typography>
                  </Box>
                )}
                {exp.description && (
                  <Typography variant="body1" sx={{ mb: 1 }}>{exp.description}</Typography>
                )}
                <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ mt: 1 }}>
                  {exp.skills.map((skill, i) => (
                    <Chip key={i} label={skill} size="small" color={idx === 0 ? 'primary' : 'secondary'} />
                  ))}
                </Stack>
              </Paper>
            </TimelineContent>
          </TimelineItem>
        ))}
      </Timeline>
      <Typography
        variant="h3"
        component="h2"
        sx={{ mt: 8, mb: 3, textAlign: 'center', fontWeight: 700 }}
      >
        Education
      </Typography>
      <Paper elevation={3} sx={{ p: 3, mb: 2, bgcolor: isDark ? 'background.paper' : '#fff', maxWidth: 600, mx: 'auto' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
          <Avatar sx={{ bgcolor: 'secondary.main', color: '#fff' }}>
            {education.school[0]}
          </Avatar>
          <Box>
            <Typography variant="h6" fontWeight={700}>{education.school}</Typography>
            <Typography variant="subtitle2" color="text.secondary">{education.degree}</Typography>
          </Box>
        </Box>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>{education.date}</Typography>
        <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ mt: 1 }}>
          {education.skills.map((skill, i) => (
            <Chip key={i} label={skill} size="small" color="secondary" />
          ))}
        </Stack>
      </Paper>
    </Container>
  );
};

export default Experience; 