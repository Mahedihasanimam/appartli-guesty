import { isAuthenticated } from "@/util/isAuthenticated";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const ProfileProtect = ({ children }) => {
  const [loading, setLoading] = useState(true); // Start by assuming the page is loading
  const [isOwner, setIsOwner] = useState(null); // Keep track of user role
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Only access localStorage on the client side (after the component is mounted)
      const storedIsOwner = localStorage.getItem("isOwner"); // Get role from localStorage
      console.log("Stored isOwner value from localStorage:", storedIsOwner); // Debugging
      if(!localStorage.getItem('token')){
        router.push('/auth/OwnarLogin')
      }
      if (storedIsOwner === "true") {
        // Redirect to owner profile if isOwner is true
        router.push("/ownerProfile");
      } else {
        // Update state to stop loading and allow rendering
        setIsOwner(false); // Set role as non-owner
        setLoading(false);
      }
    }
  }, [ router]); // This runs only once when the component mounts (client-side only)

  if (loading) {
    return <div>Loading...</div>; // Show loading while we check localStorage
  }

  // Render children only if authenticated and user is not an owner
  return isAuthenticated() && !isOwner ? children : null;
};

export default ProfileProtect;
