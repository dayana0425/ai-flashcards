"use client";

import React, { useState, useEffect } from 'react';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/router';
import { collection, doc, getDoc, setDoc } from 'firebase/firestore';
import { Container, Stack, Card, CardActionArea, CardContent, Typography, Box, CircularProgress } from '@mui/material';
import { db } from '@/firebase';

export default function Flashcard() {
  // Show Flashcards record for the user
  const { isLoaded, isSignedIn, user } = useUser();
  const [flashcards, setFlashcards] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const handleCardClick = (id) => {
    router.push(`/flashcard?id=${id}`);
  };

  useEffect(() => {
    async function getFlashcards() {
      if (!user) {
        setLoading(false);
        return;
      }
      try {
        const docRef = doc(collection(db, 'users'), user.id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const collections = docSnap.data().flashcards || [];
          setFlashcards(collections);
        } else {
          await setDoc(docRef, { flashcards: [] });
        }
      } catch (error) {
        console.error("Error fetching flashcards:", error);
      } finally {
        setLoading(false);
      }
    }
    if (isLoaded) getFlashcards();
  }, [isLoaded, user]);

  if (loading) {
    return (
      <Container maxWidth="md" sx={{ textAlign: 'center', mt: 4 }}>
        <CircularProgress />
      </Container>
    );
  }

  if (!isSignedIn) {
    return (
      <Container maxWidth="md" sx={{ textAlign: 'center', mt: 4 }}>
        <Typography variant="h6">Please sign in to view your flashcards.</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="md">
      <Stack direction="row" flexWrap="wrap" justifyContent="space-between" spacing={3} sx={{ mt: 4 }}>
        {flashcards.map((flashcard, index) => (
          <Box key={index} sx={{ width: { xs: '100%', sm: '48%', md: '30%' } }}>
            <Card>
              <CardActionArea onClick={() => handleCardClick(flashcard.name)}>
                <CardContent>
                  <Typography variant="h5" component="div">
                    {flashcard.name}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Box>
        ))}
      </Stack>
    </Container>
  );
}