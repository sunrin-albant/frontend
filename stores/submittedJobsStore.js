import create from 'zustand';

const useSubmittedJobsStore = create((set) => ({
  submittedJobs: [],
  addSubmittedJob: (job) => set((state) => ({
    submittedJobs: [...state.submittedJobs, job],
  })),
}));

export default useSubmittedJobsStore;
