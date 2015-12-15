# app/controllers/api/registrations_controller.rb
class RegistrationsController < BaseController
  skip_before_filter :authenticate_user_from_token!, :only => :create

  #
  # CREATE
  #  
  def create
    @user = User.new(user_params)

    if(@user.save)
      @auth_token = jwt_token(@user, user_params['password'])
      @data = @user.as_json

      render json: @data, status: :created
    else
      render json: @user.errors
    end
  end

  #
  # SIGN IN
  #   
  def sign_in
  end

  private

  def user_params
    params.require(:user).permit(:email, :username, :password, :password_confirmation)
  end

end
