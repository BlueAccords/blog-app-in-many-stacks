# app/controllers/api/sessions_controller.rb
class SessionsController < BaseController
  skip_before_filter :authenticate_user_from_token!
  before_filter :ensure_params_exist

  def create
    puts "$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$"
    puts "here"
    puts "$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$"
    user = User.find_for_database_authentication(email: user_params[:email])
    return invalid_login_attempt unless user
    return invalid_login_attempt unless user.valid_password?(user_params[:password])
    auth_token = jwt_token(user, user_params[:password])

    render json: { user: user, token: auth_token }
  end

  private

    def user_params
      params.require(:user).permit(:email, :password)
    end

    # Calls renders render_unauthorized with passed in error. 
    # Checks if email or password are blank   
    def ensure_params_exist
      if user_params[:email].blank? || user_params[:password].blank?
        return render_unauthorized errors: { unauthenticated: ["Incomplete credentials"] }
      end
    end

    # Calls renders render_unauthorized with passed in error. 
    def invalid_login_attempt
      render_unauthorized errors: { unauthenticated: ["Invalid credentials"] }
    end
end