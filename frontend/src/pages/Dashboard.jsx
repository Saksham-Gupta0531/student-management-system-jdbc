import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Search, Filter, Users, UserPlus } from 'lucide-react';
import api from '../services/api';
import StudentCard from '../components/StudentCard';
import Loader from '../components/Loader';
import Modal from '../components/Modal';

const Dashboard = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCourse, setFilterCourse] = useState('');
  const [courses, setCourses] = useState([]);
  
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [studentToDelete, setStudentToDelete] = useState(null);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      setLoading(true);
      const response = await api.get('/students');
      setStudents(response.data);
      
      // Extract unique courses for the filter dropdown
      const uniqueCourses = [...new Set(response.data.map(s => s.course))];
      setCourses(uniqueCourses.filter(Boolean));
    } catch (error) {
      console.error('Error fetching students:', error);
      toast.error('Failed to load students. Is the server running?');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = (student) => {
    setStudentToDelete(student);
    setIsModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!studentToDelete) return;
    
    try {
      await api.delete(`/students/${studentToDelete.id}`);
      setStudents(students.filter(s => s.id !== studentToDelete.id));
      toast.success('Student deleted successfully!');
    } catch (error) {
      console.error('Error deleting student:', error);
      toast.error('Failed to delete student.');
    } finally {
      setIsModalOpen(false);
      setStudentToDelete(null);
    }
  };

  // Filter and sort students
  const filteredStudents = students
    .filter(student => {
      const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           student.email.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCourse = filterCourse ? student.course === filterCourse : true;
      return matchesSearch && matchesCourse;
    })
    .sort((a, b) => a.name.localeCompare(b.name)); // Sort A-Z by default

  return (
    <div className="animate-fade-in pb-12">
      <div className="bg-white rounded-2xl shadow-soft p-6 mb-8 mt-8 border border-gray-100">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="bg-pink-50 p-3 rounded-xl text-nykaa-primary">
              <Users size={24} />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Students Overview</h1>
              <p className="text-gray-500 text-sm mt-1">Manage your student directory</p>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={18} className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2.5 w-full sm:w-64 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-nykaa-primary/20 focus:border-nykaa-primary transition-colors bg-gray-50 focus:bg-white"
              />
            </div>
            
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Filter size={18} className="text-gray-400" />
              </div>
              <select
                value={filterCourse}
                onChange={(e) => setFilterCourse(e.target.value)}
                className="pl-10 pr-8 py-2.5 w-full sm:w-auto border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-nykaa-primary/20 focus:border-nykaa-primary transition-colors appearance-none bg-gray-50 focus:bg-white"
              >
                <option value="">All Courses</option>
                {courses.map(course => (
                  <option key={course} value={course}>{course}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {loading ? (
        <Loader />
      ) : filteredStudents.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredStudents.map(student => (
            <StudentCard 
              key={student.id} 
              student={student} 
              onDeleteClick={handleDeleteClick} 
            />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-soft p-12 text-center border border-gray-100 flex flex-col items-center justify-center min-h-[400px]">
          <div className="bg-gray-50 p-6 rounded-full mb-6">
            <Users size={48} className="text-gray-300" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">No students found</h2>
          <p className="text-gray-500 mb-8 max-w-md mx-auto">
            {searchTerm || filterCourse 
              ? "We couldn't find any students matching your current filters. Try adjusting your search."
              : "Your student directory is currently empty. Start by adding a new student to the system."}
          </p>
          {(searchTerm || filterCourse) ? (
            <button 
              onClick={() => { setSearchTerm(''); setFilterCourse(''); }}
              className="px-6 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-xl transition-colors"
            >
              Clear Filters
            </button>
          ) : (
            <Link 
              to="/add"
              className="flex items-center gap-2 px-6 py-3 bg-nykaa-primary hover:bg-nykaa-primaryDark text-white font-medium rounded-xl transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
            >
              <UserPlus size={20} />
              <span>Add First Student</span>
            </Link>
          )}
        </div>
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={confirmDelete}
        title="Delete Student"
        message={`Are you sure you want to delete ${studentToDelete?.name}? This action cannot be undone.`}
      />
    </div>
  );
};

export default Dashboard;
