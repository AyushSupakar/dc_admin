import { Stack } from "expo-router";

import { ClerkProvider } from '@clerk/clerk-expo';
import { tokenCache } from '@clerk/clerk-expo/token-cache'


const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY

export default function RootLayout() {

  if (!publishableKey) {
    throw new Error('Add EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY to your .env file')
  }

  return(
    <ClerkProvider tokenCache={tokenCache} publishableKey={publishableKey}>
        <Stack>
            <Stack.Screen name="index" options={{ headerShown: false }} />
        </Stack>
    </ClerkProvider>);
}
