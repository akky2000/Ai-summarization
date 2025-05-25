import React, { useState, useEffect } from 'react';
import { Input } from '../../components/ui/input';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button } from '../../components/ui/button';
import { useSelector } from 'react-redux';
import { Card } from '../../components/ui/card';
import {
  Edit2, Save, User, Phone, Mail,
  MapPin, Calendar, Briefcase, Globe, X
} from 'lucide-react';

const Profile = () => {
  const profile = useSelector(state => state.auth.user);

  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(false);
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

  const handleChange = (field) => (e) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      await new Promise(res => setTimeout(res, 1000));
      toast.success('Profile updated successfully!');
      setEditMode(false);
    } catch (error) {
      toast.error('Something went wrong!');
    } finally {
      setLoading(false);
    }
  };

  const renderField = (label, value, field, type = 'text', icon = null) => (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 flex items-center gap-2">
        {icon} {label}
      </label>
      {editMode ? (
        <Input
          type={type}
          value={formData[field]}
          onChange={handleChange(field)}
          className="rounded-lg"
        />
      ) : (
        <p className="text-base text-gray-900 dark:text-gray-100 font-medium">
          {value || 'Not specified'}
        </p>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 py-20 px-4 mt-20 text-gray-800">
      <ToastContainer position="top-right" autoClose={3000} theme="colored" />
      <div className="max-w-3xl mx-auto">
        <Card className="rounded-xl shadow-lg overflow-hidden border dark:border-gray-700">
          <div className="bg-blue-600 text-white p-6 flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold">Profile</h1>
              <p className="text-blue-100">Manage your profile information</p>
            </div>
            <Button
              onClick={toggleEditMode}
              variant={editMode ? "secondary" : "outline"}
              className={`transition-all ${editMode ? "bg-white text-blue-600" : "text-white border-white hover:bg-white/20"}`}
            >
              {editMode ? (
                <><X className="w-4 h-4 mr-2" /> Cancel</>
              ) : (
                <><Edit2 className="w-4 h-4 mr-2" /> Edit</>
              )}
            </Button>
          </div>

          <div className="p-6 bg-gray-50 dark:bg-gray-800">
            <h2 className="text-lg font-semibold mb-4 text-gray-700 dark:text-gray-200">Personal Details</h2>
            {renderField('First Name', formData.firstName, 'firstName', 'text', <User size={16} />)}
            {renderField('Last Name', formData.lastName, 'lastName', 'text', <User size={16} />)}
            {renderField('Date of Birth', formData.dob, 'dob', 'date', <Calendar size={16} />)}
            {renderField('Occupation', formData.occupation, 'occupation', 'text', <Briefcase size={16} />)}
          </div>

          <div className="p-6 bg-white dark:bg-gray-900">
            <h2 className="text-lg font-semibold mb-4 text-gray-700 dark:text-gray-200">Contact Information</h2>
            {renderField('Email', formData.email, 'email', 'email', <Mail size={16} />)}
            {renderField('Phone', formData.phone, 'phone', 'tel', <Phone size={16} />)}
            {renderField('Address', formData.address, 'address', 'text', <MapPin size={16} />)}
            {renderField('Website', formData.website, 'website', 'text', <Globe size={16} />)}
          </div>

          {editMode && (
            <div className="bg-gray-100 dark:bg-gray-800 px-6 py-4 border-t dark:border-gray-700 flex justify-end">
              <Button
                onClick={handleSave}
                disabled={loading}
                className="bg-blue-600 hover:bg-blue-700 text-white shadow rounded-lg px-6"
              >
                <Save className="w-4 h-4 mr-2" />
                {loading ? 'Saving...' : 'Save Changes'}
              </Button>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default Profile;
