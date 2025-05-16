import React, { useState, useEffect } from 'react';
import { Input } from '../../components/ui/input';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button } from '../../components/ui/button';
import { useSelector } from 'react-redux';
import { Card } from '../../components/ui/card';
import { Edit2, Save, User, Phone, Mail, MapPin, Calendar, Briefcase, Globe, X } from 'lucide-react';

const Profile = () => {
  // Get user data from Redux store
  const profile = useSelector(state => state.auth.user);
  
  // State for edit mode and form data
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    dob: '',
    occupation: '',
    website: ''
  });

  // Initialize form data when profile loads
  useEffect(() => {
    if (profile) {
      setFormData({
        firstName: profile.firstName || '',
        lastName: profile.lastName || '',
        email: profile.email || '',
        phone: profile.phone || '',
        address: profile.address || '',
        dob: profile.dob || '',
        occupation: profile.occupation || '',
        website: profile.website || ''
      });
    }
  }, [profile]);

  // Handle input changes
  const handleChange = (field) => (e) => {
    setFormData({
      ...formData,
      [field]: e.target.value
    });
  };

  // Toggle edit mode
  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  // Save profile changes
  const handleSave = () => {
    // Here you would typically make an API call to save the data
    console.log('Saving profile data:', formData);
    
    // Show success message
    toast.success('Profile updated successfully!');
    
    // Exit edit mode
    setEditMode(false);
  };

  // Profile field component
  const ProfileField = ({ icon, label, value, editComponent, fieldName }) => (
    <div className="flex gap-4 p-3 hover:bg-gray-50 rounded-lg transition-colors">
      <div className="p-2 bg-blue-100 rounded-full text-blue-600">
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-500">{label}</p>
        {editMode ? (
          editComponent
        ) : (
          <p className="text-gray-800 font-medium truncate">
            {value || <span className="text-gray-400">Not specified</span>}
          </p>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-blue-50 py-20 px-4 mt-20">
      <div className="max-w-4xl mx-auto">
        <ToastContainer position="top-right" autoClose={3000} />
        
        <Card className="rounded-xl shadow-md overflow-hidden border-0">
          {/* Profile Header */}
          <div className="bg-gradient-to-r from-indigo-600 to-blue-600 p-6 text-white relative">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center shadow-lg">
                  <User className="w-8 h-8 text-blue-600" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold">
                    {formData.firstName} {formData.lastName}
                  </h1>
                  <p className="text-blue-100">{formData.email}</p>
                </div>
              </div>
              
              <Button
                onClick={toggleEditMode}
                variant={editMode ? "secondary" : "outline"}
                className={editMode ? "bg-white text-blue-600" : "text-white border-white hover:bg-white/20"}
              >
                {editMode ? (
                  <>
                    <X className="w-4 h-4 mr-2" />
                    Cancel
                  </>
                ) : (
                  <>
                    <Edit2 className="w-4 h-4 mr-2" />
                    Edit Profile
                  </>
                )}
              </Button>
            </div>
          </div>

          {/* Profile Content */}
          <div className="bg-white p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Personal Information Column */}
            <div>
              <h2 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b">Personal Details</h2>
              
              <ProfileField
                icon={<User size={16} />}
                label="First Name"
                value={formData.firstName}
                editComponent={
                  <Input
                    value={formData.firstName}
                    onChange={handleChange('firstName')}
                    className="rounded-lg mt-1"
                  />
                }
              />
              
              <ProfileField
                icon={<User size={16} />}
                label="Last Name"
                value={formData.lastName}
                editComponent={
                  <Input
                    value={formData.lastName}
                    onChange={handleChange('lastName')}
                    className="rounded-lg mt-1"
                  />
                }
              />
              
              <ProfileField
                icon={<Calendar size={16} />}
                label="Date of Birth"
                value={formData.dob}
                editComponent={
                  <Input
                    type="date"
                    value={formData.dob}
                    onChange={handleChange('dob')}
                    className="rounded-lg mt-1"
                  />
                }
              />
              
              <ProfileField
                icon={<Briefcase size={16} />}
                label="Occupation"
                value={formData.occupation}
                editComponent={
                  <Input
                    value={formData.occupation}
                    onChange={handleChange('occupation')}
                    className="rounded-lg mt-1"
                  />
                }
              />
            </div>

            {/* Contact Information Column */}
            <div>
              <h2 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b">Contact Information</h2>
              
              <ProfileField
                icon={<Mail size={16} />}
                label="Email Address"
                value={formData.email}
                editComponent={
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={handleChange('email')}
                    className="rounded-lg mt-1"
                  />
                }
              />
              
              <ProfileField
                icon={<Phone size={16} />}
                label="Phone Number"
                value={formData.phone}
                editComponent={
                  <Input
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange('phone')}
                    className="rounded-lg mt-1"
                  />
                }
              />
              
              <ProfileField
                icon={<MapPin size={16} />}
                label="Address"
                value={formData.address}
                editComponent={
                  <Input
                    value={formData.address}
                    onChange={handleChange('address')}
                    className="rounded-lg mt-1"
                  />
                }
              />
              
              <ProfileField
                icon={<Globe size={16} />}
                label="Website"
                value={formData.website}
                editComponent={
                  <Input
                    value={formData.website}
                    onChange={handleChange('website')}
                    className="rounded-lg mt-1"
                    placeholder="https://"
                  />
                }
              />
            </div>
          </div>

          {/* Save Button (only in edit mode) */}
          {editMode && (
            <div className="bg-gray-50 px-6 py-4 border-t flex justify-end">
              <Button
                onClick={handleSave}
                className="bg-blue-600 hover:bg-blue-700 text-white shadow-sm rounded-lg px-6"
              >
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </Button>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default Profile;