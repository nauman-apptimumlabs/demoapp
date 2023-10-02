import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {FcLike, FcDislike} from 'react-icons/fc';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import {toast} from 'react-toastify';

function YogaShow() {
    const {id} = useParams();
    const [yoga, setYoga] = useState(null);
    const [comments, setComments] = useState([]);
    const [newCommentContent, setNewCommentContent] = useState('');
    const [exerciseMade, setExerciseMade] = useState(false);
    const [editCommentId, setEditCommentId] = useState(null);
    const [editedCommentContent, setEditedCommentContent] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`http://localhost:3000/api/v1/yougas/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setYoga(response.data.youga);
                setComments(response.data.comments);
            } catch (error) {
                console.error('Error fetching yoga details:', error);
            }
        };

        fetchData();
    }, [id]);

    const renderCommentText = (comment) => {
        if (editCommentId === comment.id) {
            return (
                <div>
                    <input
                        type="text"
                        value={editedCommentContent}
                        onChange={(e) => setEditedCommentContent(e.target.value)}
                    />
                    <button onClick={() => handleSaveEdit(comment.id)}>Save</button>
                </div>
            );
        } else {
            return <p className="card-text msms">{comment.content}</p>;
        }
    };

    const handleEditCommentClick = (commentId, commentContent) => {
        setEditCommentId(commentId);
        setEditedCommentContent(commentContent);
    };

    const handleSaveEdit = async (commentId) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.put(
                `http://localhost:3000/api/v1/comments/${commentId}`,
                {
                    comment: {
                        content: editedCommentContent,
                    },
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setComments((prevComments) =>
                prevComments.map((comment) =>
                    comment.id === commentId
                        ? {
                            ...comment,
                            content: response.data.content,
                        }
                        : comment
                )
            );

            setEditCommentId(null);
            toast.success('Comment edited successfully.', {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 3000,
            });
            window.location.reload()
        } catch (error) {
            console.error('Error editing comment:', error);
        }
    };

    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(
                'http://localhost:3000/api/v1/comments',
                {
                    content: newCommentContent,
                    youga_id: id,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setComments([...comments, response.data]);
            setNewCommentContent('');
            toast.success('Comment created successfully.', {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 3000,
            });
            window.location.reload();
        } catch (error) {
            console.error('Error creating comment:', error);
        }
    };

    const handleMakeExercise = async () => {
        try {
            const token = localStorage.getItem('token');
            await axios.post(
                'http://localhost:3000/api/v1/exercises',
                {
                    youga_id: id,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setExerciseMade(true);
            toast.success('Gracefully added to exercise.', {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 5000,
            });
            navigate(`/yoga/${id}`);
        } catch (error) {
            console.error('Error making exercise:', error);
        }
    };

    const handleDeleteComment = async (commentId) => {
        try {
            const token = localStorage.getItem('token');
            await axios.delete(`http://localhost:3000/api/v1/comments/${commentId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setComments((prevComments) =>
                prevComments.filter((comment) => comment.id !== commentId)
            );

            toast.success('Comment deleted successfully.', {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 3000,
            });
        } catch (error) {
            console.error('Error deleting comment:', error);
        }
    };

    if (!yoga) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container mt-5 pb-5">
            <div className="row">
                <div className="col-md-12 text-center show_video">
                    {!exerciseMade ? (
                        <FcLike className="Link_btn" onClick={handleMakeExercise}/>
                    ) : (
                        <FcDislike className="Link_btn"/>
                    )}
                    <h2>{yoga.name}</h2>
                    <iframe width={600} height={400}
                            src={`https://www.youtube.com/embed/${yoga.video_url}`}
                    >
                    </iframe>
                    <p className="show_youga_discription">{yoga.description}</p>
                </div>
            </div>
            <div className="col-md-12 comment pt-5">
                <h1>Comments</h1>
                {comments.map((comment) => (
                    <div key={comment.id} className="mb-3">
                        <div className="card">
                            <div className="card-body">
                                {renderCommentText(comment)}
                                <div className="d-flex justify-content-between">
                                    <p className="card-title bg-secondary text-white p-2 rounded">{comment.user_email}</p>
                                    <p className="card-text time">{comment.created_at}</p>
                                </div>
                                {comment.comment_user_id === comment.current_user && (
                                    <div className="mt-2">
                                        {editCommentId !== comment.id && (
                                            <span onClick={() => handleEditCommentClick(comment.id, comment.content)}
                                                  className="text-primary mx-3 my-2 text-decoration-underline fw-bold">Edit</span>
                                        )}
                                        <span onClick={() => handleDeleteComment(comment.id)}
                                              className="text-danger text-decoration-underline fw-bold">Delete</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
                <br/>
                <form onSubmit={handleCommentSubmit}>
                    <div className="mb-3">
            <textarea
                type="text"
                cols="50"
                row="4"
                className="form-control"
                placeholder="Enter your comment here..."
                value={newCommentContent}
                onChange={(e) => setNewCommentContent(e.target.value)}
                required
            />
                    </div>
                    <button type="submit" className="btn comment_btn">
                        Comment
                    </button>
                </form>
            </div>
        </div>
    );
}

export default YogaShow;
