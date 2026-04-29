import React from 'react';
import { Link } from 'react-router-dom';
import { Edit2, Trash2, Mail, BookOpen, User } from 'lucide-react';

const StudentCard = ({ student, onDeleteClick }) => {
  return (
    <div className="bg-white rounded-2xl shadow-soft hover:shadow-soft-lg transition-all duration-300 transform hover:-translate-y-1 overflow-hidden border border-gray-100 flex flex-col h-full group">
      <div className="h-2 bg-gradient-to-r from-nykaa-primary to-pink-300 w-full"></div>
      <div className="p-6 flex-grow flex flex-col">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="bg-pink-50 text-nykaa-primary p-3 rounded-full group-hover:bg-nykaa-primary group-hover:text-white transition-colors duration-300">
              <User size={24} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 line-clamp-1">{student.name}</h3>
              <p className="text-sm text-gray-500 font-medium">ID: {student.id}</p>
            </div>
          </div>
        </div>
        
        <div className="space-y-3 mb-6 flex-grow">
          <div className="flex items-center text-gray-600 gap-3 bg-gray-50 p-2.5 rounded-xl">
            <Mail size={16} className="text-nykaa-primary" />
            <span className="text-sm truncate">{student.email}</span>
          </div>
          <div className="flex items-center text-gray-600 gap-3 bg-gray-50 p-2.5 rounded-xl">
            <BookOpen size={16} className="text-nykaa-primary" />
            <span className="text-sm font-medium">{student.course}</span>
          </div>
        </div>
        
        <div className="flex gap-3 mt-auto pt-4 border-t border-gray-100">
          <Link
            to={`/edit/${student.id}`}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-white border-2 border-gray-100 rounded-xl text-gray-700 font-medium hover:bg-gray-50 hover:border-gray-200 transition-all focus:outline-none focus:ring-2 focus:ring-gray-200"
          >
            <Edit2 size={16} />
            <span>Edit</span>
          </Link>
          <button
            onClick={() => onDeleteClick(student)}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-white border-2 border-red-50 rounded-xl text-red-500 font-medium hover:bg-red-50 hover:border-red-100 transition-all focus:outline-none focus:ring-2 focus:ring-red-100"
          >
            <Trash2 size={16} />
            <span>Delete</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudentCard;
