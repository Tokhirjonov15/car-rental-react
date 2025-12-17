import { 
    Box, 
    Button, 
    Container, 
    Stack, 
    Typography, 
    TextField 
} from "@mui/material";
import VerifiedIcon from '@mui/icons-material/Verified';

export function MainHome () {
    return (
        <Box className="hero-section">
            <Container maxWidth="lg">
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Box className="hero-left">
                        <Box className="badge">
                            <span>
                                <VerifiedIcon />
                                Best Car Rental Platform
                            </span>
                        </Box>
                        <Typography className="hero-title">
                            Looking for a <br />
                            <span>Perfect Ride?</span>
                        </Typography>
                        <Typography className="hero-desc">
                            Explore our premium fleet for your daily commute or long-distance
                            travel. fast, secure, and affordable.
                        </Typography>

                        <Stack direction="row" alignItems="center" className="happy-users">
                            <Stack direction="row" spacing={-1.5}>
                                <img src="/img/userimg.png" />
                                <img src="/img/userimg2.png" />
                                <img src="/img/userimg3.png" />
                            </Stack>
                            <Typography
                                className="happy-text"
                            >
                                12.5k+ Happy Customers
                            </Typography>
                        </Stack>
                    </Box>
                    <Box className="hero-right">
                        <img
                            src="/img/tesla.png"
                            alt="car"
                            className="hero-car"
                        />
                    </Box>
                </Stack>

                <Box className="search-box">
                    <Stack direction="row" spacing={2} alignItems="center">
                        <TextField
                            placeholder="Search your location..."
                            className="search-input"
                        />
                        <TextField
                            value="Tue 15 Feb, 09:00"
                            className="search-input"
                        />
                        <TextField
                            value="Thu 18 Feb, 11:00"
                            className="search-input"
                        />
                        <Button className="search-btn">
                            Search Car
                        </Button>
                    </Stack>
                </Box>
            </Container>
        </Box>
    )
};