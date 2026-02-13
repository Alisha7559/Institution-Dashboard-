import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  TextField,
  Avatar,
  Chip,
  Stack
} from '@mui/material';

const students = [
  {
    name: 'Aarav Kumar',
    email: 'aarav@gmail.com',
    course: 'Full Stack Web',
    status: 'Active'
  },
  {
    name: 'Meera Sharma',
    email: 'meera@gmail.com',
    course: 'UI/UX Design',
    status: 'Active'
  },
  {
    name: 'Rahul Verma',
    email: 'rahul@gmail.com',
    course: 'Data Science',
    status: 'Inactive'
  }
];

export default function Students() {
  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Typography variant="h4" fontWeight={600}>
          Students
        </Typography>

        <TextField
          size="small"
          placeholder="Search students..."
          sx={{ width: 260 }}
        />
      </Stack>

      {/* Student Cards */}
      <Grid container spacing={3}>
        {students.map((student, index) => (
          <Grid item xs={12} md={6} lg={4} key={index}>
            <Card sx={{ borderRadius: 3 }}>
              <CardContent>
                <Stack direction="row" spacing={2} alignItems="center">
                  <Avatar sx={{ bgcolor: '#1976d2' }}>
                    {student.name.charAt(0)}
                  </Avatar>

                  <Box>
                    <Typography fontWeight={600}>
                      {student.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {student.email}
                    </Typography>
                  </Box>
                </Stack>

                <Stack
                  direction="row"
                  justifyContent="space-between"
                  mt={3}
                  alignItems="center"
                >
                  <Typography variant="body2">
                    Course:
                    <strong> {student.course}</strong>
                  </Typography>

                  <Chip
                    label={student.status}
                    color={
                      student.status === 'Active'
                        ? 'success'
                        : 'default'
                    }
                    size="small"
                  />
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
