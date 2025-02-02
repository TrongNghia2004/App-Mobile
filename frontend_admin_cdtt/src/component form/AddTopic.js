import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TopicService from '../service/TopicService';


function AddTopic() {
    const [addtopic, setAddtopic] = useState({
        name: '',       // Thêm trường name
        slug: '',
        description: '', // Thêm trường description
        sort_order: '',  // Thêm trường sort_order
        status: '',      // Có thể là 'active' hoặc 'inactive'
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setAddtopic({
            ...addtopic,
            [name]: value,
        });
    };

  

    const handleAddTopic = async (e) => {
        e.preventDefault();

        const formData = new FormData(); // Tạo form data để gửi kèm hình ảnh
        formData.append('name', addtopic.name);  // Gửi trường name
        formData.append('slug', addtopic.slug);  // Gửi trường link
        formData.append('description', addtopic.description);  // Gửi trường description
        formData.append('sort_order', addtopic.sort_order);  // Gửi trường sort_order
        formData.append('status', addtopic.status);

        try {
            await TopicService.add(formData); 
            navigate('/topic'); 
        } catch (error) {
            setError('Có lỗi xảy ra khi thêm chủ đề bài viết');
            console.error(error);
        }
    };

    return (
        <div className="max-w-xl p-6 mx-auto mt-10 bg-gray-100 rounded-lg shadow-md">
            <h2 className="mb-6 text-2xl font-semibold text-center text-gray-700">Thêm Chủ Đề Bài Viết</h2>
            {error && <p className="mb-4 text-center text-red-500">{error}</p>}
            <form onSubmit={handleAddTopic} className="space-y-4">

                <div className="form-group">
                    <label className="block mb-1 text-gray-600">Tên chủ đề bài viết:</label>
                    <input
                        type="text"
                        name="name"
                        value={addtopic.name}
                        onChange={handleInputChange}
                        required
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="form-group">
                    <label className="block mb-1 text-gray-600">Slug:</label>
                    <input
                        type="text"
                        name="slug"
                        value={addtopic.slug}
                        onChange={handleInputChange}
                        required
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="form-group">
                    <label className="block mb-1 text-gray-600">Mô tả:</label>
                    <textarea
                        name="description"
                        value={addtopic.description}
                        onChange={handleInputChange}
                        required
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="form-group">
                    <label className="block mb-1 text-gray-600">Thứ tự:</label>
                    <input
                        type="number"
                        name="sort_order"
                        value={addtopic.sort_order}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="form-group">
                    <label className="block mb-1 text-gray-600">Trạng thái:</label>
                    <select
                        name="status"
                        value={addtopic.status}
                        onChange={handleInputChange}
                        required
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="">Chọn trạng thái</option>
                        <option value="1">Hoạt động</option>
                        <option value="0">Không hoạt động</option>
                    </select>
                </div>

                <button
                    type="submit"
                    className="w-full p-2 text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    Thêm Chủ Đề Bài Viết
                </button>
            </form>
        </div>
    );
}

export default AddTopic;