import { Box, Typography, Grid, Paper } from '@mui/material';

const About = () => {
  return (
    <Box>
      <Typography variant="h2" component="h1" gutterBottom align="center">
        Hakkımızda
      </Typography>

      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h4" gutterBottom>
              Biz Kimiz?
            </Typography>
            <Typography paragraph>
              BugraCNTP olarak, teknoloji dünyasındaki en son yenilikleri takip eden ve müşterilerimize en iyi hizmeti sunmayı hedefleyen bir ekibiz. Web geliştirme, mobil uygulama geliştirme ve UI/UX tasarım alanlarında uzmanlaşmış ekibimizle, projelerinizi hayata geçiriyoruz.
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h4" gutterBottom>
              Misyonumuz
            </Typography>
            <Typography paragraph>
              Müşterilerimizin dijital dönüşüm süreçlerinde yanlarında olmak, onlara en uygun teknolojik çözümleri sunmak ve projelerini başarıyla tamamlamak için çalışıyoruz. Her projede en yüksek kalite standartlarını korumayı ve müşteri memnuniyetini en üst düzeyde tutmayı hedefliyoruz.
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h4" gutterBottom>
              Değerlerimiz
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} md={4}>
                <Typography variant="h6" gutterBottom>
                  Yenilikçilik
                </Typography>
                <Typography>
                  Teknolojik gelişmeleri yakından takip ediyor ve projelerimize en son yenilikleri entegre ediyoruz.
                </Typography>
              </Grid>
              <Grid item xs={12} md={4}>
                <Typography variant="h6" gutterBottom>
                  Kalite
                </Typography>
                <Typography>
                  Her projede en yüksek kalite standartlarını korumak için çalışıyoruz.
                </Typography>
              </Grid>
              <Grid item xs={12} md={4}>
                <Typography variant="h6" gutterBottom>
                  Müşteri Odaklılık
                </Typography>
                <Typography>
                  Müşterilerimizin ihtiyaçlarını en iyi şekilde anlayıp, onlara özel çözümler sunuyoruz.
                </Typography>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default About; 