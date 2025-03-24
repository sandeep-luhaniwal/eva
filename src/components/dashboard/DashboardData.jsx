"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";

const DashboardData = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadError, setUploadError] = useState("");
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deleteError, setDeleteError] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        router.push("/login");
        return;
      }

      try {
        const response = await axios.get("http://localhost:5000/api/users/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUserData(response.data);
      } catch (err) {
        console.error("Error fetching user data:", err.response?.data || err.message);
        setError("Failed to fetch user data");
        if (err.response?.status === 401) {
          localStorage.removeItem("token");
          router.push("/login");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [router]);

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploadError("");
    setUploadProgress(0);


    if (!file.type.startsWith("image/")) {
      setUploadError("Please select an image file (JPEG, PNG, etc.)");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setUploadError("Image size should be less than 5MB");
      return;
    }

    setSelectedImage(URL.createObjectURL(file));

    const formData = new FormData();
    formData.append("profileImage", file);

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:5000/api/users/upload-profile",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setUploadProgress(percentCompleted);
          },
        }
      );

      setUserData(response.data.user);
      setSelectedImage(null);

      setTimeout(() => setUploadProgress(0), 1000);
    } catch (error) {
      console.error("Error uploading image:", error);
      setUploadError(
        error.response?.data?.message || "Failed to upload image. Please try again."
      );
      setSelectedImage(null);
    }
  };

  const handleDeleteImage = async () => {
    if (!userData?.profileImage) return;

    setDeleteLoading(true);
    setDeleteError("");

    try {
      const token = localStorage.getItem("token");
      const response = await axios.delete(
        "http://localhost:5000/api/users/delete-profile-image",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUserData(response.data.user);
      setSelectedImage(null);
    } catch (error) {
      console.error("Error deleting image:", error);
      setDeleteError(
        error.response?.data?.message || "Failed to delete image. Please try again."
      );
    } finally {
      setDeleteLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 text-center text-red-500">
        {error}
        <div className="mt-4">
          <Link href="/login" className="text-blue-500 hover:underline">
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Dashboard</h1>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex flex-col items-center mb-4">
          <div className="relative mb-4 group">
            <div className="relative">
              <img
                src={
                  selectedImage || 
                  (userData?.profileImage 
                    ? `http://localhost:5000${userData.profileImage}`
                    : "/default-avatar.png")
                }
                alt="Profile"
                className="w-32 h-32 rounded-full object-cover border-4 border-blue-100 transition-all duration-300 group-hover:opacity-80"
              />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="flex flex-col items-center space-y-2">
                  <label htmlFor="profile-upload" className="cursor-pointer bg-blue-500 bg-opacity-70 rounded-full p-2">
                    <p>Choose Image</p>
                  </label>
                  {userData?.profileImage && (
                    <button
                      onClick={handleDeleteImage}
                      disabled={deleteLoading}
                      className="cursor-pointer bg-red-500 bg-opacity-70 rounded-full p-2"
                    >
                      {deleteLoading ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6 text-white animate-spin"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                      ) : (
                       <p>
                        Delete
                       </p>
                      )}
                    </button>
                  )}
                </div>
              </div>
            </div>
            <input
              id="profile-upload"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </div>

          {uploadProgress > 0 && uploadProgress < 100 && (
            <div className="w-full max-w-xs bg-gray-200 rounded-full h-2.5 mb-2">
              <div
                className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
                style={{ width: `${uploadProgress}%` }}
              ></div>
              <p className="text-xs text-center mt-1">Uploading: {uploadProgress}%</p>
            </div>
          )}

          {uploadError && (
            <p className="text-red-500 text-sm mb-2 text-center max-w-xs">{uploadError}</p>
          )}

          {deleteError && (
            <p className="text-red-500 text-sm mb-2 text-center max-w-xs">{deleteError}</p>
          )}

          <h2 className="text-xl font-semibold">{userData?.name}</h2>
          <p className="text-gray-600">{userData?.email}</p>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg">
            <thead className="bg-gray-50">
              <tr>
                <th className="py-3 px-4 border-b text-left">Field</th>
                <th className="py-3 px-4 border-b text-left">Value</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="py-3 px-4 border-b">Name</td>
                <td className="py-3 px-4 border-b">{userData?.name}</td>
              </tr>
              <tr>
                <td className="py-3 px-4 border-b">Email</td>
                <td className="py-3 px-4 border-b">{userData?.email}</td>
              </tr>
              <tr>
                <td className="py-3 px-4 border-b">Mobile Number</td>
                <td className="py-3 px-4 border-b">{userData?.number}</td>
              </tr>
              <tr>
                <td className="py-3 px-4 border-b">Profile Image</td>
                <td className="py-3 px-4 border-b">
                  {userData?.profileImage ? "Uploaded" : "Not uploaded"}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="text-center">
        <Link
          href="/"
          className="inline-block px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200"
        >
          Go back to Home
        </Link>
      </div>
    </div>
  );
};

export default DashboardData;