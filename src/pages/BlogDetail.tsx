import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Heart, Share2, MessageCircle, Send, ThumbsUp, Calendar, Eye, Tag } from 'lucide-react';
import { BlogPost, Comment } from '../types/Blog';
import { blogPosts } from '../data/blog';
import { useAuth } from '../hooks/useAuth';

const BlogDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();

  // Trouver le post correspondant
  const post = blogPosts.find((p) => p.id === id);

 

  const [isLiked, setIsLiked] = useState(post?.isLiked || false);
  const [likes, setLikes] = useState(post?.likes);
  const [comments, setComments] = useState<Comment[]>(post?.comments || []);
  const [newComment, setNewComment] = useState('');
 // Si le post n'existe pas, afficher un message
  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-white rounded-lg p-8 shadow-lg text-center">
          <h2 className="text-2xl font-bold mb-4">Article introuvable</h2>
          <button
            onClick={() => navigate('/blog')}
            className="bg-blue-900 text-white px-6 py-2 rounded-lg hover:bg-blue-800 transition-colors"
          >
            Retour au blog
          </button>
        </div>
      </div>
    );
  }
  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikes(prev => isLiked ? prev - 1 : prev + 1);
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || !user) return;

    const comment: Comment = {
      id: `comment-${Date.now()}`,
      author: {
        id: user.id,
        name: `${user.firstName} ${user.lastName}`,
        avatar: user.avatar ?? ''
      },
      content: newComment,
      createdAt: new Date(),
      likes: 0,
      isLiked: false
    };

    setComments(prev => [...prev, comment]);
    setNewComment('');
  };

  const handleCommentLike = (commentId: string) => {
    setComments(prev => prev.map(comment => 
      comment.id === commentId 
        ? { 
            ...comment, 
            isLiked: !comment.isLiked,
            likes: comment.isLiked ? comment.likes - 1 : comment.likes + 1
          }
        : comment
    ));
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'tutorials': return 'bg-blue-100 text-blue-800';
      case 'news': return 'bg-green-100 text-green-800';
      case 'tips': return 'bg-orange-100 text-orange-800';
      case 'updates': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <button
            onClick={() => navigate('/blog')}
            className="flex items-center text-gray-600 hover:text-blue-900 transition-colors mb-4"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            <span>Retour au blog</span>
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Article header */}
        <article className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
          <div className="relative h-96 overflow-hidden">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 text-white">
              <div className="flex items-center space-x-3 mb-4">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(post.category)}`}>
                  {post.category}
                </span>
                <div className="flex items-center space-x-4 text-sm">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>{new Date(post.publishedAt).toLocaleDateString('fr-FR')}</span>
                  </div>
                  <div className="flex items-center">
                    <Eye className="h-4 w-4 mr-1" />
                    <span>{post.readTime} de lecture</span>
                  </div>
                </div>
              </div>
              <h1 className="text-3xl lg:text-4xl font-bold leading-tight">{post.title}</h1>
            </div>
          </div>

          {/* Article meta */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <img
                  src={post.author.avatar}
                  alt={post.author.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <p className="font-semibold text-gray-900">{post.author.name}</p>
                  <p className="text-sm text-gray-600">{post.author.role}</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <button
                  onClick={handleLike}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                    isLiked 
                      ? 'bg-red-100 text-red-600' 
                      : 'bg-gray-100 text-gray-600 hover:bg-red-50 hover:text-red-600'
                  }`}
                >
                  <Heart className={`h-5 w-5 ${isLiked ? 'fill-current' : ''}`} />
                  <span>{likes}</span>
                </button>
                <button className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors">
                  <Share2 className="h-5 w-5" />
                  <span>Partager</span>
                </button>
              </div>
            </div>
          </div>

          {/* Article content */}
          <div className="p-6">
            <div 
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* Tags */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="flex items-center space-x-2 mb-4">
                <Tag className="h-5 w-5 text-gray-500" />
                <span className="font-medium text-gray-700">Tags:</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium hover:bg-blue-200 cursor-pointer transition-colors"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </article>

        {/* Comments section */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center space-x-2 mb-6">
            <MessageCircle className="h-6 w-6 text-gray-700" />
            <h3 className="text-xl font-bold text-gray-900">
              Commentaires ({comments.length})
            </h3>
          </div>

          {/* Add comment form */}
          {user ? (
            <form onSubmit={handleCommentSubmit} className="mb-8">
              <div className="flex space-x-4">
                <div className="w-10 h-10 bg-blue-900 rounded-full flex items-center justify-center text-white font-bold">
                  {user.firstName.charAt(0)}
                </div>
                <div className="flex-1">
                  <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Ajouter un commentaire..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    rows={3}
                  />
                  <div className="flex justify-end mt-3">
                    <button
                      type="submit"
                      disabled={!newComment.trim()}
                      className="bg-blue-900 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                    >
                      <Send className="h-4 w-4" />
                      <span>Publier</span>
                    </button>
                  </div>
                </div>
              </div>
            </form>
          ) : (
            <div className="bg-gray-50 rounded-lg p-6 mb-8 text-center">
              <p className="text-gray-600 mb-4">Connectez-vous pour laisser un commentaire</p>
              <button
                onClick={() => navigate('/login')}
                className="bg-blue-900 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-800 transition-colors"
              >
                Se Connecter
              </button>
            </div>
          )}

          {/* Comments list */}
          <div className="space-y-6">
            {comments.map((comment) => (
              <div key={comment.id} className="border-b border-gray-200 pb-6 last:border-b-0">
                <div className="flex space-x-4">
                  <img
                    src={comment.author.avatar || 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400'}
                    alt={comment.author.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="font-semibold text-gray-900">{comment.author.name}</span>
                      <span className="text-sm text-gray-500">
                        {new Date(comment.createdAt).toLocaleDateString('fr-FR')}
                      </span>
                    </div>
                    <p className="text-gray-700 mb-3 leading-relaxed">{comment.content}</p>
                    <div className="flex items-center space-x-4">
                      <button
                        onClick={() => handleCommentLike(comment.id)}
                        className={`flex items-center space-x-1 text-sm transition-colors ${
                          comment.isLiked 
                            ? 'text-red-600' 
                            : 'text-gray-500 hover:text-red-600'
                        }`}
                      >
                        <ThumbsUp className={`h-4 w-4 ${comment.isLiked ? 'fill-current' : ''}`} />
                        <span>{comment.likes}</span>
                      </button>
                      <button className="text-sm text-gray-500 hover:text-blue-600 transition-colors">
                        Répondre
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetail;
