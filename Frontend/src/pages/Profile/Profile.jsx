import React, { useContext, useEffect, useState } from "react";
import UserContext from "../../contexts/userContext";
import { useFetchSubsciberCount } from "../../hooks/useSubscriptionHooks";
import EditModal from "../../components/EditImage/EditImage";
import {
  useDeleteUser,
  useLogoutUser,
  useUpdateImages,
} from "../../hooks/useUserHooks";
import { IoSettingsSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import EditPassword from "../../components/EditPassword/EditPassword";
import EditImage from "../../components/EditImage/EditImage";

function Profile() {
  const { loggedUser } = useContext(UserContext);
  const { fetchSubsCount } = useFetchSubsciberCount();
  const {
    updateAvatar,
    updateCoverImage,
    loading: loadingUpdate,
  } = useUpdateImages();
  const {
    deleteUser,
    loading: loadingDelete,
  } = useDeleteUser();
  const logoutUser = useLogoutUser();
  const [totalSubs, setTotalSubs] = useState(0);
  const [showCoverEdit, setShowCoverEdit] = useState(false);
  const [showAvatarEdit, setShowAvatarEdit] = useState(false);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [showEditPassword, setShowEditPassword] = useState(false);
  const [coverImageFile, setCoverImageFile] = useState(null);
  const [avatarImageFile, setAvatarImageFile] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSubsribersCount = async () => {
      if (loggedUser) {
        const subs = await fetchSubsCount({ username: loggedUser.username });
        setTotalSubs(subs);
      }
    };
    fetchSubsribersCount();
  }, [fetchSubsCount, loggedUser]);

  // Close the modal when loading becomes false
  useEffect(() => {
    if (!loadingUpdate) {
      setShowCoverEdit(false);
      setShowAvatarEdit(false);
    }
  }, [loadingUpdate]);

  // Handle updating cover image
  const handleUpdateCover = async (file) => {
    await updateCoverImage({ coverImage: file });
  };

  // Handle updating avatar
  const handleUpdateAvatar = async (file) => {
    await updateAvatar({ avatar: file });
  };



  // Handle deleting account
  const handleDelete = () => {
    setShowConfirmDelete(true);
  };

  const confirmDelete = async () => {
    await deleteUser();
    // console.log(response);
    logoutUser();
    navigate("/");
    setShowConfirmDelete(false);
  };
  const cancelDelete = () => {
    setShowConfirmDelete(false);
  };


  // Handle editing password
  const handleEditPassword = () => {
    setShowEditPassword(true);
  };

  if (!loggedUser) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-darkbg flex flex-col text-lighttext min-h-full">
      {/* Cover Image Section */}
      <div className="bg-cover bg-center sm:h-65 h-32 flex justify-center items-center relative">
        <img
          src={loggedUser.coverImage || "https://placehold.co/600x400"}
          alt="coverImage"
          className="w-full h-full object-cover"
        />
        <button
          className="absolute sm:bottom-0 sm:right-0 -bottom-2 -right-2 bg-darkbg text-lighttext rounded-full sm:w-12 sm:h-12 w-10 h-10 m-4 flex justify-center items-center"
          onClick={() => setShowCoverEdit(true)}
        >
          <IoSettingsSharp className="sm:text-3xl text-2xl" />
        </button>
      </div>

      {/* Avatar Section */}
      <div className="flex justify-items-start items-center mb-4 relative w-full">
        <div className="ml-4.5 -mt-16 relative">
          <img
            src={loggedUser.avatar}
            alt="avatarImage"
            className="sm:w-36 sm:h-36 w-20 h-20 object-cover rounded-full border-4 border-darkbg"
          />
          <button
            className="absolute sm:right-0 -top-2 -right-4 bg-darkbg text-lighttext rounded-full sm:w-12 sm:h-12 w-10 h-10 flex justify-center items-center"
            onClick={() => setShowAvatarEdit(true)}
          >
            <IoSettingsSharp className="sm:text-3xl text-2xl" />
          </button>
        </div>

        {/* User Info */}
        <div className="flex items-center justify-between mr-6">
          <div className="ml-4.5">
            <h1 className="text-lighttext text-xl mt-2 sm:text-2xl">{loggedUser.fullname}</h1>
            <p className="text-darktext text-lg">{`@${loggedUser.username}`}</p>
          </div>
        </div>
      </div>

      {/* Profile Info */}
      <div className="flex flex-col">
        <div className="text-xl  font-bold mx-4 py-2 rounded">
          <span className="mr-2">Email :</span>
          <span className="text-darktext">{loggedUser.email}</span>
        </div>
        <div className="text-xl  font-bold mx-4 py-2 rounded">
          <span className="mr-2">Joined :</span>
          <span className="text-darktext">
            {new Date(loggedUser.createdAt).toLocaleDateString()}
          </span>
        </div>
        <div className="text-xl  font-bold mx-4 py-2 rounded">
          <span className="mr-2">Subscribers :</span>
          <span className="text-darktext">{totalSubs}</span>
        </div>
        <div className="text-xl  font-bold mx-4 py-2 rounded flex flex-col w-fit gap-4">
          <button
            className="text-xl py-2 px-4 font-bold rounded bg-lightbg hover:bg-lightbg/80"
            onClick={handleEditPassword}
          >
            Change Password
          </button>
          <button
            className="text-xl py-2 px-4 font-bold rounded bg-red-500 hover:bg-red-600"
            onClick={handleDelete}
          >
            Delete Account
          </button>
        </div>
      </div>
      {
        // If showConfirmDelete is true, show the delete confirmation box
        showConfirmDelete && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-30">
            <div className="bg-darkbg text-lighttext p-6 rounded-lg shadow-lg">
              <h2 className="text-xl font-semibold mb-4">Confirm Delete</h2>
              <p className="mb-2">
                Are you sure you want to delete your account?
              </p>
              <p className="mb-4 text-darktext text-sm">
                All your data (videos, comments, tweets, likes) will be
                permanently deleted.
              </p>
              <div className="flex justify-end">
                <button
                  onClick={cancelDelete}
                  className="bg-lightbg text-lighttext px-4 py-2 rounded mr-2 hover:bg-lightbg/70"
                >
                  Cancel
                </button>
                <button
                  disabled={loadingDelete}
                  onClick={confirmDelete}
                  className="bg-red-600 text-lighttext px-4 py-2 rounded hover:bg-red-600/70 disabled:bg-red-600/50"
                >
                  {loadingDelete ? "This may take a while..." : "Delete"}
                </button>
              </div>
            </div>
          </div>
        )
      }

      {
        // If showChangePassword is true, show the change password box
        showEditPassword && (
          <EditPassword
            onClose={() => setShowEditPassword(false)}
          />
        )
      }

      {/* Edit Modals */}
      <EditImage
        isOpen={showCoverEdit}
        onClose={() => setShowCoverEdit(false)}
        title="Cover Image"
        imageFile={coverImageFile}
        setImageFile={setCoverImageFile}
        onUpdate={handleUpdateCover}
        loading={loadingUpdate}
      />

      <EditImage
        isOpen={showAvatarEdit}
        onClose={() => setShowAvatarEdit(false)}
        title="Avatar"
        imageFile={avatarImageFile}
        setImageFile={setAvatarImageFile}
        onUpdate={handleUpdateAvatar}
        isAvatar={true}
        loading={loadingUpdate}
      />
    </div>
  );
}

export default Profile;
