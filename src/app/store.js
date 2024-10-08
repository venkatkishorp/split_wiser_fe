import { create } from 'zustand';


const useStore = create((set) => ({
	uploadedImage: null,
	setImage: (image) => set({ uploadedImage: image }),
}));

export default useStore; 