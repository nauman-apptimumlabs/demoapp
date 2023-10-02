class Api::V1::CommentsController < ApplicationController
  before_action :find_comment, only: [:show, :update, :destroy]

  def index
    @comments = Comment.all.includes(:user)
    render json: @comments.to_json(include: { user: { only: :name } })
  end

  def show
    render json: @comment
  end

  def create
    @comment = Comment.new(comment_params)
    @comment.user = current_user
    if @comment.save
      render json: { message: 'Comment successfully created', comment: @comment }, status: :created
    else
      render json: { errors: @comment.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def update
    if @comment.update(comment_params)
      render json: { message: 'Comment successfully updated', comment: @comment }
    else
      render json: { errors: @comment.errors.full_messages }, status: :unprocessable_entity
    end
  end


  def destroy
    @comment.destroy
    render json: { message: 'Comment successfully deleted' }
  end

  private

  def comment_params
    params.require(:comment).permit(:content, :user_id, :youga_id)
  end

  def find_comment
      @comment = Comment.find(params[:id])
  end
end
