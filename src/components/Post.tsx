import { format, formatDistanceToNow } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import { ChangeEvent, FormEvent, InvalidEvent, useState } from 'react';

import { Avatar } from './Avatar';
import { Comment } from './Comment';

import styles from './Post.module.css';

interface Author {
  name: string;
  role: string;
  authorUrl: string;
}

interface Content {
  type: 'paragraph' | 'link';
  content: string;
}

export interface PostProps {
  author: Author;
  publishedAt: Date;
  content: Content[];
}

export function Post({author, publishedAt, content}: PostProps) {

  const [comments, setComments] = useState([
    'Post muito Legal!'
  ])

  const [newCommentText, setNewCommentText] = useState('')

  const publishedDateFormatted = format(publishedAt, "d 'de' LLLL 'às' HH:mm'h'", {
    locale: ptBR,
  })

  const publishedDateRelativeToNow = formatDistanceToNow(publishedAt, {
    locale: ptBR,
    addSuffix: true
  })

  function handleCreateNewComment(event: FormEvent) {
    event.preventDefault();
    setComments([...comments, newCommentText]);
    setNewCommentText('');
  }

  function handleNewCommentChange(event: ChangeEvent<HTMLTextAreaElement>) {
    event.target.setCustomValidity('');
    setNewCommentText(event.target.value);
  }

  function handleNewCommentInvalid(event: InvalidEvent<HTMLTextAreaElement>){
    event.target.setCustomValidity('Esse caompo é Obrigatório!');
  }

  function deleteComment(commentToDelete: string){
    const commentsWithOutDeletedOne = comments.filter(comment => {
      return comment !== commentToDelete;
    })
    setComments(commentsWithOutDeletedOne)
  }

  const isNewCommentEmpty = newCommentText.length === 0;

  return(
    <article className={styles.post}>
      <header>
        <div className={styles.author}>
          <Avatar src={author.authorUrl} />
          <div className={styles.authorinfo}>
            <strong>{author.name}</strong>
            <span>{author.role}</span>
          </div>
        </div>
        <time title={publishedDateRelativeToNow} dateTime='2022-12-10 20:51'>{publishedDateRelativeToNow}</time>
      </header>
      <div className={styles.content}>
        {content.map(line => {
          if (line.type === 'paragraph') {
            return <p key={line.content}>{line.content}</p>;
          } else if (line.type === 'link'){
          return <p key={line.content}><a href='#'>{line.content}</a></p>;
          }
        })}
      </div>
      <form onSubmit={handleCreateNewComment} className={styles.commentForm}>
        <strong>Deixe seu comentario</strong>
        <textarea
          name='comment'
          placeholder='Deixe um comentário' 
          value={newCommentText}
          onChange={handleNewCommentChange}
          onInvalid={handleNewCommentInvalid}
          required
        />
        <footer>
          <button 
            type='submit' disabled = {isNewCommentEmpty}>
            Publicar
          </button>
        </footer>
      </form>
      <div className={styles.commentList}>
        {comments.map(comment => {
          return (
            <Comment 
              key={comment} 
              content={comment} 
              onDeleteComment={deleteComment}
            />)
        })}
      </div>
    </article>
  );
}
