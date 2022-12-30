import { Header } from './components/Header';
import { Post, PostProps } from './components/Post'

import styles from './App.module.css';

import './global.css';
import { Sidebar } from "./components/Sidebar";

interface Post extends PostProps {
  id: number
}

const posts:Post[] = [
  {
    id: 1,
    author: {
      authorUrl: 'https://avatars.githubusercontent.com/u/24707167?v=4',
      name: 'Roberto David',
      role: 'Web developer',
    },
    content:[
      {type: 'paragraph', content: 'Fala galeraa 👋' },
      {type: 'paragraph', content: 'Acabei de subir mais um projeto no meu portifa. É um projeto que fiz no NLW Return, evento da Rocketseat. O nome do projeto é DoctorCare 🚀' },
      {type: 'link', content: '👉 jane.design/doctorcare' },
    ],
    publishedAt: new Date('2022-12-11 20:00:00')
  },
  {
    id: 2,
    author: {
      authorUrl: 'https://scontent.fpoa11-2.fna.fbcdn.net/v/t39.30808-1/315635444_1521879298241057_8230468834619690449_n.jpg?stp=dst-jpg_p200x200&_nc_cat=103&ccb=1-7&_nc_sid=7206a8&_nc_ohc=H1BBgUDwldEAX8mbXdF&_nc_ht=scontent.fpoa11-2.fna&oh=00_AfAMLGpL5ga6jIpJnjAgEZcSAB6HKEsN1dKYOdyDpTWqNw&oe=63A3B132',
      name: 'Vitória David',
      role: 'Web developer',
    },
    content:[
      {type: 'paragraph', content: 'Fala galeraa 👋' },
      {type: 'paragraph', content: 'Acabei de subir mais um projeto no meu portifa. É um projeto que fiz no NLW Return, evento da Rocketseat. O nome do projeto é DoctorCare 🚀' },
      {type: 'link', content: '👉 jane.design/doctorcare' },
    ],
    publishedAt: new Date('2022-12-10 20:00:00')
  },
];

export function App() {
  return (
    <div>
      <Header />

      <div className={styles.wrapper}>
        <Sidebar />
        <main>
          {posts.map(post => {
            return (
              <Post
                key={post.id}
                author={post.author}
                content={post.content}
                publishedAt={post.publishedAt}
              />
            )
          })}
        </main>
      </div>
    </div>
    
  );
}



