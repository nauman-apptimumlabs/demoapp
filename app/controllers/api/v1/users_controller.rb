class Api::V1::UsersController < ApplicationController
  def create
    user = User.new(user_params)

    if user.save
      render json: { message: 'User successfully created' }, status: :created
    else
      render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def login
    user = User.find_by(email: params[:email])

    if user && user.authenticate(params[:password])
      token = JWT.encode({ user_id: user.id }, ENV["JWT_SECRET"], 'HS256')
      render json: { token: token, message: 'Login successful' }
    else
      render json: { error: 'Invalid credentials' }, status: :unauthorized
    end
  end

  def logout
    render json: { message: 'Logged out successfully' }, status: :ok
  end


  private

  def user_params
    params.require(:user).permit(:email, :password, :password_confirmation)
  end
end
