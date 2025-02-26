import { useState, useRef } from "react";

const API_URL = "http://127.0.0.1:5000/diagnose"; // Update with Render URL if deployed

const AiDoctor = () => {
    const [formData, setFormData] = useState({
        name: "",
        gender: "",
        age: "",
        symptoms: "",
        medicalHistory: ""
    });

    const [formErrors, setFormErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [diagnosis, setDiagnosis] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });

        // Clear error when user starts typing
        if (formErrors[name]) {
            setFormErrors({
                ...formErrors,
                [name]: ""
            });
        }
    };

    const validateForm = () => {
        const errors = {};
        if (!formData.name.trim()) errors.name = "Name is required";
        if (!formData.gender) errors.gender = "Gender is required";
        if (!formData.age) errors.age = "Age is required";
        else if (isNaN(formData.age) || parseInt(formData.age) <= 0 || parseInt(formData.age) > 120) {
            errors.age = "Please enter a valid age";
        }
        if (!formData.symptoms.trim()) errors.symptoms = "Please describe your symptoms";

        return errors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const errors = validateForm();
        setFormErrors(errors);

        if (Object.keys(errors).length === 0) {
            setIsSubmitting(true);

            try {
                // Construct query parameters
                const queryParams = new URLSearchParams({
                    name: formData.name,
                    age: formData.age,
                    gender: formData.gender,
                    symptoms: formData.symptoms,
                    medicalHistory: formData.medicalHistory || ""
                });

                // Send request to Flask API
                const response = await fetch(`${API_URL}?${queryParams.toString()}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                    }
                });

                if (!response.ok) {
                    throw new Error("Failed to fetch diagnosis");
                }

                const data = await response.json();
                setDiagnosis(data.diagnosis);
            } catch (error) {
                console.error("Error fetching diagnosis:", error);
            } finally {
                setIsSubmitting(false);
            }
        }
    };

    const resetForm = () => {
        setDiagnosis(null);
        setFormErrors({});
        setFormData({
            name: "",
            gender: "",
            age: "",
            symptoms: "",
            medicalHistory: ""
        });
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center py-10 px-4">
            <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500 mb-6">
                AI Doctor Consultation
            </h2>

            <div className="w-full max-w-6xl">
                {!diagnosis ? (
                    <div className="bg-gray-800 p-8 rounded-xl shadow-xl border border-purple-500">
                        <p className="text-gray-300 mb-8 text-center">
                            Fill in your details and describe your symptoms for an AI-assisted assessment.
                            This does not replace professional medical advice.
                        </p>

                        <form onSubmit={handleSubmit} className="max-w-5xl mx-auto">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                                <div className="group">
                                    <label className="block text-gray-300 mb-2">Full Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="w-full bg-gray-700 text-white px-4 py-3 rounded-lg border border-gray-600 focus:outline-none focus:border-pink-500"
                                        placeholder="Enter your full name"
                                    />
                                    {formErrors.name && <p className="text-red-400 text-sm mt-1">{formErrors.name}</p>}
                                </div>

                                <div className="group">
                                    <label className="block text-gray-300 mb-2">Age</label>
                                    <input
                                        type="number"
                                        name="age"
                                        value={formData.age}
                                        onChange={handleChange}
                                        className="w-full bg-gray-700 text-white px-4 py-3 rounded-lg border border-gray-600 focus:outline-none focus:border-pink-500"
                                        placeholder="Enter your age"
                                    />
                                    {formErrors.age && <p className="text-red-400 text-sm mt-1">{formErrors.age}</p>}
                                </div>
                            </div>

                            <div className="mb-8">
                                <label className="block text-gray-300 mb-2">Gender</label>
                                <select
                                    name="gender"
                                    value={formData.gender}
                                    onChange={handleChange}
                                    className="w-full bg-gray-700 text-white px-4 py-3 rounded-lg border border-gray-600 focus:outline-none focus:border-pink-500"
                                >
                                    <option value="">Select Gender</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Other">Other</option>
                                </select>
                                {formErrors.gender && <p className="text-red-400 text-sm mt-1">{formErrors.gender}</p>}
                            </div>

                            <div className="mb-8">
                                <label className="block text-gray-300 mb-2">Describe Your Symptoms</label>
                                <textarea
                                    name="symptoms"
                                    value={formData.symptoms}
                                    onChange={handleChange}
                                    className="w-full bg-gray-700 text-white px-4 py-3 rounded-lg border border-gray-600 focus:outline-none focus:border-pink-500 h-32"
                                    placeholder="Describe your symptoms"
                                ></textarea>
                                {formErrors.symptoms && <p className="text-red-400 text-sm mt-1">{formErrors.symptoms}</p>}
                            </div>

                            <div className="mb-8">
                                <label className="block text-gray-300 mb-2">Medical History (Optional)</label>
                                <textarea
                                    name="medicalHistory"
                                    value={formData.medicalHistory}
                                    onChange={handleChange}
                                    className="w-full bg-gray-700 text-white px-4 py-3 rounded-lg border border-gray-600 focus:outline-none focus:border-pink-500 h-24"
                                    placeholder="List any existing medical conditions"
                                ></textarea>
                            </div>

                            <div className="flex justify-center">
                                <button
                                    type="submit"
                                    className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-8 py-4 rounded-lg transition hover:scale-105"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? "Processing..." : "Get AI Assessment"}
                                </button>
                            </div>
                        </form>
                    </div>
                ) : (
                    <div className="bg-gray-800 p-8 rounded-xl shadow-xl border border-purple-500">
                        <h3 className="text-2xl font-bold text-pink-500 mb-4">AI Diagnosis</h3>
                        <p className="text-white whitespace-pre-line">{diagnosis}</p>

                        <button onClick={resetForm} className="mt-6 bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-500">
                            Start New Assessment
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AiDoctor;
