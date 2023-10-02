class Api::V1::YougasController < ApplicationController
  before_action :find_youga, only: [:show, :update, :destroy]

  def index
    @yougas = Youga.all
    yougas_with_image_urls = @yougas.map { |youga| youga.attributes.merge(image_url: youga.image_url) }
    render json: yougas_with_image_urls
  end

  def show
    @comments = @youga.comments.includes(:user)
    comment_data = @comments.map do |comment|
      {
        id: comment.id,
        content: comment.content,
        created_at: comment.updated_at.strftime("%Y-%m-%d %H:%M:%S"),
        user_email: comment.user.email,
        comment_user_id: comment.user.id,
        current_user: current_user.id
      }
    end
    render json: {
      youga: @youga,
      comments: comment_data
    }
  end

  def create
    @youga = Youga.new(youga_params)
    if @youga.save
      render json: { message: 'Youga successfully created', youga: @youga }, status: :created
    else
      render json: { errors: @youga.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def update
    if @youga.update(youga_params)
      render json: { message: 'Youga successfully updated', youga: @youga }
    else
      render json: { errors: @youga.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def destroy
    @youga.destroy
    render json: { message: 'Youga successfully deleted' }
  end

  private

  def youga_params
    params.require(:youga).permit(:name, :description, :duration, :user_id, :picture, :video_url)
  end

  def find_youga
    @youga = Youga.find(params[:id])
  end
end
