"use client";

import { AppBar, Toolbar, Typography, Button, Box, Stack } from "@mui/material";
import { SignedOut, SignedIn, UserButton } from "@clerk/nextjs";
import getStripe from "../utils/get-stripe";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Image from "next/image";

// Color Variables
const primaryColor = "#182351";
const secondaryColor = "#6191ce";
const backgroundColor = "#F4F8FB";
const whiteColor = "#FFFFFF";
const textColor = "#333333";
const headingColor = primaryColor;

const theme = createTheme({
  palette: {
    primary: {
      main: primaryColor,
    },
    secondary: {
      main: secondaryColor,
    },
    background: {
      default: backgroundColor,
    },
    text: {
      primary: textColor,
    },
    white: {
      main: whiteColor,
    },
  },
  typography: {
    fontFamily: '"Roboto", sans-serif',
    h2: {
      fontWeight: 700,
      color: headingColor,
    },
    h4: {
      fontWeight: 600,
      color: headingColor,
    },
    button: {
      textTransform: "none",
    },
  },
});

export default function Home() {
  const handleSubmit = async () => {
    const checkoutSession = await fetch("/api/checkout_sessions", {
      method: "POST",
      headers: { origin: "http://localhost:3000" },
    });
    const checkoutSessionJson = await checkoutSession.json();

    const stripe = await getStripe();
    const { error } = await stripe.redirectToCheckout({
      sessionId: checkoutSessionJson.id,
    });

    if (error) {
      console.warn(error.message);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      {/* Hero Section */}
      <Box
        className="hero"
        sx={{
          textAlign: "center",
          py: { xs: 4, md: 8 },
          backgroundColor: theme.palette.primary.main,
          color: theme.palette.white.main,
        }}
      >
        <Typography
          variant="h2"
          component="h1"
          gutterBottom
          sx={{
            color: theme.palette.white.main,
            fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
          }}
        >
          Welcome to FlashGen
        </Typography>
        <Typography
          variant="h5"
          component="h2"
          gutterBottom
          sx={{
            color: theme.palette.white.main,
            fontSize: { xs: "1rem", sm: "1.25rem", md: "1.5rem" },
          }}
        >
          The easiest way to create flashcards for just $1/month!
        </Typography>

        <Box className="hero-buttons" sx={{ mt: 4 }}>
          <Button
            variant="contained"
            color="secondary"
            sx={{
              mt: 2,
              mr: 2,
              px: { xs: 2, md: 4 },
              py: { xs: 1, md: 1.5 },
              borderRadius: 2,
            }}
            href="/generate"
            elevation={3}
          >
            Generate Flashcards
          </Button>
         
        </Box>
      </Box>

      {/* Features Section */}
      <Box
        className="features-section"
        sx={{
          py: { xs: 4, md: 6 },
          backgroundColor: theme.palette.background.default,
          px: { xs: 2, sm: 4, md: 8 },
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <Typography
          variant="h4"
          component="h2"
          gutterBottom
          sx={{
            textAlign: "center",
            color: theme.palette.primary.main,
            fontSize: { xs: "1.5rem", md: "2rem" },
          }}
        >
          Features
        </Typography>
        <Stack
          className="feature-list"
          spacing={4}
          direction={{ xs: "column", md: "row" }}
          justifyContent="center"
          alignItems="center"
          sx={{ width: "100%", maxWidth: "300px" }}
        >
          {/* Feature 1 */}
          <Box
            className="feature-1"
            sx={{
              textAlign: "center",
              p: 2,
              backgroundColor: theme.palette.secondary.main,
              borderRadius: 4,
              boxShadow: 1,
              width: { xs: "100%", md: "300px" },
            }}
          >
            <Image
              src="/assets/1.png"
              alt="Paste in Text"
              width={300}
              height={300}
              style={{ borderRadius: "8px" }}
            />
            <Typography
              variant="h5"
              sx={{
                color: theme.palette.primary.main,
                fontSize: { xs: "1.25rem", md: "1.5rem" },
              }}
            >
              Paste Your Notes
            </Typography>
            <Typography variant="body1" color="text.primary">
              Turn your class notes into ready-to-use flashcards with just a
              click!
            </Typography>
          </Box>

          {/* Feature 2 */}
          <Box
            className="feature-2"
            sx={{
              textAlign: "center",
              p: 2,
              backgroundColor: theme.palette.secondary.main,
              borderRadius: 4,
              boxShadow: 1,
              width: { xs: "100%", md: "300px" },
              maxWidth: { xs: "100%", md: "300px" },
            }}
          >
            <Image
              src="/assets/2.png"
              alt="Mnemonic Cues"
              width={300}
              height={300}
              style={{ borderRadius: "8px" }}
            />
            <Typography
              variant="h5"
              sx={{
                color: theme.palette.primary.main,
                fontSize: { xs: "1.25rem", md: "1.5rem" },
              }}
            >
              Mnemonic Cues
            </Typography>
            <Typography variant="body1" color="text.primary">
              Enhance memory retention with personalized mnemonic suggestions.
            </Typography>
          </Box>

          {/* Feature 3 */}
          <Box
            className="feature-3"
            sx={{
              textAlign: "center",
              p: 2,
              backgroundColor: theme.palette.secondary.main,
              borderRadius: 4,
              boxShadow: 1,
              width: { xs: "100%", md: "300px" },
              maxWidth: { xs: "100%", md: "300px" },
            }}
          >
            <Image
              src="/assets/3.png"
              alt="Create Sets of 10"
              width={300}
              height={300}
              style={{ borderRadius: "8px" }}
            />
            <Typography
              variant="h5"
              sx={{
                color: theme.palette.primary.main,
                fontSize: { xs: "1.25rem", md: "1.5rem" },
              }}
            >
              Create Sets of 10
            </Typography>
            <Typography variant="body1" color="text.primary">
              Organize your study materials into manageable sets of 10
              flashcards.
            </Typography>
          </Box>
        </Stack>
      </Box>

      {/* Pricing Section */}
      <Box
        className="pricing-section"
        sx={{
          py: { xs: 4, md: 6 },
          backgroundColor: theme.palette.background.default,
          px: { xs: 2, sm: 4, md: 8 },
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <Typography
          variant="h4"
          component="h2"
          gutterBottom
          sx={{
            textAlign: "center",
            color: theme.palette.primary.main,
            fontSize: { xs: "1.5rem", md: "2rem" },
          }}
        >
          Pricing
        </Typography>

        <Stack
          className="pricing-list"
          spacing={4}
          direction={{ xs: "column", md: "row" }}
          justifyContent="center"
          alignItems="center"
          sx={{ width: "100%", maxWidth: "300px" }}
        >
          {/* Price 1 */}
          <Box
            className="price-1"
            sx={{
              textAlign: "center",
              p: 2,
              backgroundColor: theme.palette.secondary.main,
              borderRadius: 4,
              boxShadow: 1,
              width: { xs: "100%", md: "300px" },
            }}
          >
            <Image
              src="/assets/4.png"
              alt="Price"
              width={300}
              height={300}
              style={{ borderRadius: "8px" }}
            />
            <Typography
              variant="h5"
              sx={{
                color: theme.palette.primary.main,
                fontSize: { xs: "1.25rem", md: "1.5rem" },
              }}
            >
              FlashGen Pro Plan
            </Typography>
            <Typography variant="body1">
              Get all features for just $1/month.
            </Typography>
            <Button
              variant="contained"
              color="primary"
              sx={{ mt: 2, borderRadius: 2, color: theme.palette.white.main }}
              onClick={handleSubmit}
            >
              Subscribe Now
            </Button>
          </Box>
        </Stack>
      </Box>
    </ThemeProvider>
  );
}
