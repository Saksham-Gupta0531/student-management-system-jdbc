import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { UserPlus, ArrowLeft, User, Mail, BookOpen } from 'lucide-react';
import api from '../services/api';

const AddStudent = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    course: ''
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      toast.error('Name is required');
      return false;
    }
    if (!formData.email.trim()) {
      toast.error('Email is required');
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      toast.error('Please enter a valid email address');
      return false;
    }
    if (!formData.course.trim()) {
      toast.error('Course is required');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    try {
      setLoading(true);
      await api.post('/students', formData);
      toast.success('Student added successfully!');
      navigate('/');
    } catch (error) {
      console.error('Error adding student:', error);
      toast.error('Failed to add student. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-8 animate-fade-in">
      <Link 
        to="/" 
        className="inline-flex items-center gap-2 text-gray-500 hover:text-nykaa-primary transition-colors mb-6 font-medium"
      >
        <ArrowLeft size={18} />
        <span>Back to Dashboard</span>
      </Link>
      
      <div className="bg-white rounded-3xl shadow-soft-lg overflow-hidden border border-gray-100">
        <div className="bg-gradient-to-r from-nykaa-primary to-pink-400 px-8 py-10 text-white text-center">
          <div className="bg-white/20 p-4 rounded-full inline-block mb-4 backdrop-blur-sm">
            <UserPlus size={32} />
          </div>
          <h1 className="text-3xl font-bold mb-2">Add New Student</h1>
          <p className="text-pink-100">Enter the details below to enroll a new student.</p>
        </div>
        
        <form onSubmit={handleSubmit} className="p-8">
          <div className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <User size={18} className="text-gray-400" />
                </div>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-nykaa-primary/20 focus:border-nykaa-primary transition-all text-gray-800"
                  placeholder="e.g. John Doe"
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail size={18} className="text-gray-400" />
                </div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-nykaa-primary/20 focus:border-nykaa-primary transition-all text-gray-800"
                  placeholder="e.g. john@example.com"
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="course" className="block text-sm font-semibold text-gray-700 mb-2">
                Course Enrolled
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <BookOpen size={18} className="text-gray-400" />
                </div>
                <input
                  type="text"
                  id="course"
                  name="course"
                  value={formData.course}
                  onChange={handleChange}
                  className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-nykaa-primary/20 focus:border-nykaa-primary transition-all text-gray-800"
                  placeholder="e.g. Computer Science"
                />
              </div>
            </div>
          </div>
          
          <div className="mt-10 flex gap-4">
            <Link
              to="/"
              className="flex-1 py-3.5 px-6 rounded-xl font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors text-center focus:outline-none focus:ring-2 focus:ring-gray-300"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 py-3.5 px-6 rounded-xl font-medium text-white bg-nykaa-primary hover:bg-nykaa-primaryDark transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-pink-400 disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center gap-2"
            >
              {loading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              ) : (
                <>
                  <UserPlus size={20} />
                  <span>Save Student</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddStudent;
