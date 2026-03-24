import { create } from 'zustand';

const useResumeStore = create((set) => ({
  currentResume: null,
  resumes: [],
  loading: false,
  error: null,

  setCurrentResume: (resume) => set({ currentResume: resume }),
  setResumes: (resumes) => set({ resumes }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
}));

export default useResumeStore;
