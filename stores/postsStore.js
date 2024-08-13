import { create } from 'zustand';

const usePostsStore = create((set) => ({
    posts: [
        {
            id: 1,
            username: 'user1',
            title: 'title',
            tags: ['심부름', '노동'],
            date: '2022.01.24',
            price: 2000,
            image: 'https://via.placeholder.com/50',
            isFavorite: false,
            favoriteCount: 0,
          },
          {
            id: 2,
            username: 'user2',
            title: 'title2',
            tags: ['심부름', '디자인'],
            date: '2024.05.24',
            price: 3000,
            image: 'https://via.placeholder.com/50',
            isFavorite: false,
            favoriteCount: 0,
          },
          {
            id: 3,
            username: 'user3',
            title: 'title3',
            tags: ['심부름', '기타'],
            date: '2024.07.24',
            price: 7000,
            image: 'https://via.placeholder.com/50',
            isFavorite: false,
            favoriteCount: 0,
          },
    ],
    setPosts: (posts) => set({ posts }),
}))

export default usePostsStore;