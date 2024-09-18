"use client";

import { AppBar, Toolbar, Typography, Button, Box, Stack } from "@mui/material";
import { SignedOut, SignedIn, UserButton } from "@clerk/nextjs";
import getStripe from "../utils/get-stripe";
import { createTheme, ThemeProvider } from "@mui/material/styles";

// Color Variables
const primaryColor = "#4A90E2";
const secondaryColor = "#50B5FF";
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
      <Box
        sx={{
          backgroundColor: theme.palette.background.default,
          minHeight: "100vh",
        }}
      >
        {/* Header & Navigation */}
        <AppBar
          position="static"
          sx={{ backgroundColor: theme.palette.secondary.main }}
        >
          <Toolbar>
            <Typography
              variant="h6"
              sx={{ flexGrow: 1, color: theme.palette.white.main }}
            >
              FlashGen
            </Typography>
            <SignedOut>
              <Button color="inherit" component="a" href="/sign-in">
                Login
              </Button>
              <Button color="inherit" component="a" href="/sign-up">
                Sign Up
              </Button>
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </Toolbar>
        </AppBar>

        {/* Hero Section */}
        <Box
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
            sx={{ color: theme.palette.white.main }}
          >
            Welcome to FlashGen
          </Typography>
          <Typography
            variant="h5"
            component="h2"
            gutterBottom
            sx={{ color: theme.palette.white.main }}
          >
            The easiest way to create flashcards for just $1.
          </Typography>
          <Box>
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
            <Button
              variant="outlined"
              color="secondary"
              sx={{
                mt: 2,
                px: { xs: 2, md: 4 },
                py: { xs: 1, md: 1.5 },
                borderRadius: 2,
                border: `2px solid ${theme.palette.secondary.main}`,
              }}
              href="/learn-more"
            >
              Learn More
            </Button>
          </Box>
        </Box>

        {/* Features Section */}
        <Box
          sx={{
            py: { xs: 4, md: 6 },
            backgroundColor: theme.palette.white.main,
            px: { xs: 2, sm: 4, md: 8 },
          }}
        >
          <Typography
            variant="h4"
            component="h2"
            gutterBottom
            sx={{ textAlign: "center", color: theme.palette.primary.main }}
          >
            Features
          </Typography>
          <Stack
            spacing={4}
            direction={{ xs: "column", md: "row" }}
            justifyContent="center"
            sx={{ my: 4, px: { xs: 2, sm: 4, md: 8 } }}
          >
            <Box
              sx={{
                textAlign: "center",
                p: 2,
                backgroundColor: theme.palette.background.default,
                borderRadius: 2,
                boxShadow: 1,
                width: { xs: "100%", md: "300px" },
              }}
            >
              <Typography
                variant="h5"
                sx={{ color: theme.palette.primary.main }}
              >
                AI-Powered
              </Typography>
              <Typography variant="body1" color="text.primary">
                Create flashcards instantly using AI.
              </Typography>
            </Box>
            <Box
              sx={{
                textAlign: "center",
                p: 2,
                backgroundColor: theme.palette.background.default,
                borderRadius: 2,
                boxShadow: 1,
                width: { xs: "100%", md: "300px" },
              }}
            >
              <Typography
                variant="h5"
                sx={{ color: theme.palette.primary.main }}
              >
                Customizable
              </Typography>
              <Typography variant="body1" color="text.primary">
                Organize flashcards by subject or topic.
              </Typography>
            </Box>
            <Box
              sx={{
                textAlign: "center",
                p: 2,
                backgroundColor: theme.palette.background.default,
                borderRadius: 2,
                boxShadow: 1,
                width: { xs: "100%", md: "300px" },
              }}
            >
              <Typography
                variant="h5"
                sx={{ color: theme.palette.primary.main }}
              >
                Affordable
              </Typography>
              <Typography variant="body1" color="text.primary">
                Just $1 for unlimited flashcards.
              </Typography>
            </Box>
          </Stack>
        </Box>

        {/* Pricing Section */}
        <Box
          sx={{
            py: { xs: 4, md: 6 },
            backgroundColor: theme.palette.background.default,
          }}
        >
          <Typography
            variant="h4"
            component="h2"
            gutterBottom
            sx={{ textAlign: "center", color: theme.palette.primary.main }}
          >
            Pricing
          </Typography>
          <Stack
            spacing={4}
            direction={{ xs: "column", md: "row" }}
            justifyContent="center"
            sx={{ my: 4, px: { xs: 2, sm: 4, md: 8 } }}
          >
            <Box
              sx={{
                textAlign: "center",
                p: 3,
                backgroundColor: theme.palette.primary.main,
                borderRadius: 2,
                color: theme.palette.white.main,
                width: { xs: "100%", md: "300px" },
                boxShadow: 3,
                mx: { xs: 2, md: 0 },
              }}
            >
              <Typography variant="h5" sx={{ color: theme.palette.white.main }}>
                FlashGen Plan
              </Typography>
              <Typography variant="body1">
                Get all features for just $1/month.
              </Typography>
              <Button
                variant="contained"
                color="secondary"
                sx={{ mt: 2, borderRadius: 2, color: theme.palette.white.main }}
                onClick={handleSubmit}
              >
                Subscribe Now
              </Button>
            </Box>
          </Stack>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
