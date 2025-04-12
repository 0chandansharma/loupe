# Complete Guide to Run and Build the Loupe App

I'll provide a step-by-step guide to run your app locally for development and then build the APK for distribution.

## Part 1: Setting Up Your Development Environment

### Step 1: Install Required Tools

```bash
# Install Node.js and npm (if not already installed)
brew install node

# Install Expo CLI globally
npm install -g expo-cli

# Install EAS CLI globally
npm install -g eas-cli
```

### Step 2: Set Up Android Development Environment

```bash
# Install Android Studio (if not already done)
brew install --cask android-studio

# Set up environment variables in your ~/.zshrc file
echo 'export ANDROID_HOME=$HOME/Library/Android/sdk' >> ~/.zshrc
echo 'export PATH=$PATH:$ANDROID_HOME/emulator' >> ~/.zshrc
echo 'export PATH=$PATH:$ANDROID_HOME/tools' >> ~/.zshrc
echo 'export PATH=$PATH:$ANDROID_HOME/tools/bin' >> ~/.zshrc
echo 'export PATH=$PATH:$ANDROID_HOME/platform-tools' >> ~/.zshrc

# Reload your terminal configuration
source ~/.zshrc
```

### Step 3: Create and Configure Your Project

```bash
# Create a new Expo project
npx create-expo-app loupe

# Navigate to your project directory
cd loupe

# Install required dependencies
npx expo install expo-camera expo-image-manipulator expo-image-picker expo-linear-gradient expo-media-library expo-print expo-sharing lottie-react-native moti react-native-gesture-handler react-native-reanimated react-native-safe-area-context react-native-screens react-native-toast-message react-native-vector-icons @react-native-async-storage/async-storage @react-navigation/native @react-navigation/stack axios
```

### Step 4: Set Up Project Structure

Create the folder structure as outlined in the previous responses:

```bash
mkdir -p src/{assets/{fonts,images,lottie},components/{ui,camera,summary},screens,navigation,services,hooks,context,theme}
```

Then add all the code files we've discussed to their respective locations.

## Part 2: Running the App Locally

### Step 1: Start the Development Server

```bash
# Make sure you're in your project directory
cd loupe

# Start the Expo development server
npx expo start
```

### Step 2: Run on Android

#### Option A: Using a Physical Android Device

1. Install the Expo Go app from Google Play Store on your Android device
2. Enable Developer Options and USB Debugging on your device
3. Connect your device to your Mac with a USB cable
4. Press 'a' in the terminal where Expo is running

#### Option B: Using Android Emulator

1. Open Android Studio
2. Open AVD Manager (Configure > AVD Manager)
3. Start your virtual device
4. Press 'a' in the terminal where Expo is running

### Step 3: Run on iOS (Optional)

#### Option A: Using a Physical iOS Device

1. Install the Expo Go app from the App Store on your iOS device
2. Scan the QR code displayed in the terminal with your iOS device's camera

#### Option B: Using iOS Simulator

1. Make sure you have Xcode installed
2. Press 'i' in the terminal where Expo is running

## Part 3: Building the Android APK

### Step 1: Configure EAS Build

```bash
# Initialize EAS configuration
npx eas build:configure
```

Create or update your eas.json file to include:

```json
{
  "cli": {
    "version": ">= 3.13.3"
  },
  "build": {
    "development": {
      "developmentClient": true,
      "distribution": "internal"
    },
    "preview": {
      "distribution": "internal",
      "android": {
        "buildType": "apk"
      }
    },
    "production": {
      "android": {
        "buildType": "app-bundle"
      }
    }
  },
  "submit": {
    "production": {}
  }
}
```

### Step 2: Update app.json

Make sure your app.json includes the correct configuration:

```json
{
  "expo": {
    "name": "Loupe",
    "slug": "loupe",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/icon.png",
    "userInterfaceStyle": "light",
    "splash": {
      "image": "./assets/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#FF7043"
    },
    "assetBundlePatterns": ["**/*"],
    "ios": {
      "supportsTablet": true,
      "bundleIdentifier": "com.yourcompany.loupe"
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#FF7043"
      },
      "permissions": [
        "CAMERA",
        "READ_EXTERNAL_STORAGE",
        "WRITE_EXTERNAL_STORAGE"
      ],
      "package": "com.yourcompany.loupe"
    }
  }
}
```

### Step 3: Login to Expo

```bash
# Login to your Expo account
npx eas login
```

If you don't have an Expo account, create one at [expo.dev](https://expo.dev/signup).

### Step 4: Build the APK

```bash
# Build the APK
npx eas build -p android --profile preview
```

This will:

1. Upload your code to Expo's build servers
2. Build your app in the cloud
3. Provide you with a URL to download the APK when complete

### Step 5: Download and Install the APK

1. When the build completes, you'll get a URL to download the APK
2. Download the APK to your computer
3. Transfer it to your Android device (via email, cloud storage, or USB)
4. On your Android device, open the APK file to install the app

## Part 4: Troubleshooting Common Issues

### Issue 1: Android SDK Not Found

If you see "Failed to resolve the Android SDK path":

```bash
# Check if ANDROID_HOME is set correctly
echo $ANDROID_HOME

# If not set or incorrect, set it manually
export ANDROID_HOME=$HOME/Library/Android/sdk
```

### Issue 2: Expo Command Not Found

If you see "command not found: expo":

```bash
# Use npx instead
npx expo start

# Or check your PATH
echo $PATH
```

### Issue 3: Build Errors

If you encounter build errors:

1. Check the error logs carefully
2. Make sure all dependencies are installed correctly
3. Verify your app.json and eas.json configurations
4. Try cleaning the project:

```bash
npx expo-doctor
```

### Issue 4: Device Connection Issues

If your device isn't connecting:

```bash
# Check connected devices
adb devices

# Restart ADB server if needed
adb kill-server
adb start-server
```

## Part 5: Updating Your App

When you make changes to your app and want to create a new APK:

```bash
# Make your code changes
# Then build a new APK
npx eas build -p android --profile preview
```

## Part 6: Publishing to Google Play Store (When Ready)

1. Create a Google Play Developer account ($25 one-time fee)
2. Build an app bundle instead of APK:

```bash
npx eas build -p android --profile production
```

3. Upload the bundle to Google Play Console
4. Complete the store listing and release your app

This complete guide should help you run your app locally for development and build the APK for distribution. Let me know if you encounter any specific issues along the way!
