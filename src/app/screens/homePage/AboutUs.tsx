import { Box, Stack, Typography, Button, Container } from "@mui/material";
import { useState } from "react";
import "../../../css/home.css";

export function AboutUs() {
  const [open, setOpen] = useState(false);

  return (
    <div className="why-section">
      <Container className="why-wrapper">
        <Stack direction="row" spacing={6} alignItems="center">
          <Box className="why-image">
            <img src="/img/aboutus.png" alt="Driving" />

            <Box className="support-card">
              <img src="/icons/support.png" />
              <Box>
                <Typography className="support-title">24/7 Support</Typography>
                <Typography className="support-text">
                  We are ready to help you anytime
                </Typography>
              </Box>
            </Box>
          </Box>

          <Box className="why-content">
            <Stack spacing={1.2}>
              <Typography
                className="why-label"
                sx={{ fontSize: "14px", letterSpacing: "2px" }}
              >
                WHY CHOOSE US
              </Typography>

              <Typography
                variant="h3"
                className="why-title"
                sx={{ fontSize: "36px", fontWeight: 600 }}
              >
                Best valued deals you will ever find
              </Typography>

              <Typography
                variant="body1"
                className="why-desc"
                sx={{
                  fontSize: "16px",
                  lineHeight: "26px",
                  color: "rgba(107,114,128,1)",
                  maxWidth: "480px",
                  marginTop: "6px",
                }}
              >
                We offer the best experience with our rental deals.
                We ensure all vehicles are well maintained and safe for your journey.
              </Typography>
            </Stack>

            <Stack spacing={2.5} className="why-features" marginTop="28px">
              <Box className="feature-item">
                <img src="/icons/wallet.png" />
                <Stack spacing={0.6}>
                  <Typography
                    variant="h6"
                    className="feature-title"
                    sx={{ fontWeight: 600 }}
                  >
                    Best Price Guaranteed
                  </Typography>
                  <Typography
                    className="feature-text"
                    sx={{
                      fontSize: "15px",
                      lineHeight: "24px",
                      color: "rgba(107,114,128,1)",
                    }}
                  >
                    Found a lower price? We'll match it.
                  </Typography>
                </Stack>
              </Box>

              <Box className="feature-item">
                <img src="/icons/secure.png" />
                <Stack spacing={0.6}>
                  <Typography variant="h6" className="feature-title">
                    100% Secure Payment
                  </Typography>
                  <Typography className="feature-text">
                    We ensure your transactions are safe and encrypted.
                  </Typography>
                </Stack>
              </Box>

              <Box className="feature-item">
                <img src="/icons/premium.png" />
                <Stack spacing={0.6}>
                  <Typography variant="h6" className="feature-title">
                    Premium Brands
                  </Typography>
                  <Typography className="feature-text">
                    Experience the thrill of driving top-tier vehicles.
                  </Typography>
                </Stack>
              </Box>
            </Stack>

            {/* EXTRA TEXT */}
            {open && (
              <Typography
                className="extra-text"
                sx={{
                  marginTop: "18px",
                  fontSize: "15px",
                  lineHeight: "26px",
                  color: "rgba(107,114,128,1)",
                  maxWidth: "480px",
                }}
              >
                Our customer support team is available around the clock to assist you.
                We partner only with trusted brands to guarantee quality and comfort.
              </Typography>
            )}

            <Button
              className="learn-btn"
              sx={{ marginTop: "22px" }}
              onClick={() => setOpen(!open)}
            >
              {open ? "Show Less" : "Learn More..."}
            </Button>
          </Box>
        </Stack>
      </Container>
    </div>
  );
}