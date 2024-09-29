import React from "react";
import { Image, ImageProps, StyleSheet } from "react-native";

// Define the props for your custom Image component
interface StaticImageProps extends Omit<ImageProps, "source"> {
  source: string;
}

export const StaticImage: React.FC<StaticImageProps> = ({
  source,
  style,
  ...props
}) => {
  let imageSource;

  // Instead of dynamic require, you use a mapping of static assets
  const staticImages: { [key: string]: any } = {
    "2.jpg": require("../assets/images/parks/2.jpg"),
    // Add more static images here
  };

  // Determine if the source is a remote URL or a local asset
  if (source.startsWith("http") || source.startsWith("https")) {
    // If source is a remote URL
    imageSource = { uri: source };
  } else {
    // If source is a static image, map it from the object
    imageSource = staticImages["2.jpg"];
  }

  return (
    <Image source={imageSource} style={[styles.image, style]} {...props} />
  );
};

const styles = StyleSheet.create({
  image: {
    width: "100%",
    maxWidth: 480,
    resizeMode: "cover", // Default resize mode
  },
});
