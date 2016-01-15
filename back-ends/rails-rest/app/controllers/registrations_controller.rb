# app/controllers/api/registrations_controller.rb
class RegistrationsController < BaseController
  skip_before_filter :authenticate_user_from_token!, :only => [:create, :show, :get_user_by_username]
  before_action only: [:update] do
    block_if_not_current_user(params[:id].to_i)
  end

  # @description POST /users 
  # @param {string} email - User's email. Must be unique and is required.  
  # @param {string} name - User's name 
  # @param {string} username - Username. Must be unique, it does not allow spaces, and is required. 
  # @param {string} password - User Password. Must be at least 8 characters and is required. 
  #      
  # @returns JSON Object of User 
  # @throws JSON Object of Errors
  def create

    @user = User.new(user_params)

    if(@user.save)
      @auth_token = jwt_token(@user, user_params['password'])
      @data = @user.as_json
      @data['token'] = @auth_token

    # Successful JSON in /views/registrations
    else
      respond_with @user do 
        'registrations/error'
      end
    end

  end

  # @description GET /users/:id
  # @param {string} id - User's id. Implicit Paramater. Is required.  
  # @param {string} Authorization - Authentication token. Format is'Bearer: tokenvalue' and is required.
  #      
  # @returns JSON Object of User 
  # @throws JSON Object of Errors
  def show
    @user = User.find(params[:id])   
    @auth_token = token_from_request
    render 'registrations/public'
  end

  # @description GET /users/?username=:username
  # @param {string} username - User's username.
  #      
  # @returns JSON Object of User 
  # @throws JSON Object of Errors
  def get_user_by_username
    @user = User.where(:username => params[:username])   
    render 'registrations/public'
  end

  # @description PUT /users/:id
  # @param {string} id - User's id. Implicit Paramater. Is required.  
  # @param {string} Authorization - Authentication token. Format is'Bearer: tokenvalue' and is required.
  #      
  # @returns JSON Object of User 
  # @throws JSON Object of Errors
  def update
    @user = User.find(current_user.id)

    updates = user_params.as_json
  
    if @user.update(updates)
      # We need to update the token since it depends on user data
      if(user_params.has_key?('password'))
        @auth_token = jwt_token(@user, user_params[:password])
      else
        @auth_token = jwt_token(@user, claims[0]['password'])
      end
      
      render 'registrations/show'
      
    else
      render json: @user.errors
    end
  end

  # @description DELETE /users/:id 
  # @param {string} id - User's id. Implicit Paramater. Is required.  
  # @param {string} Authorization - Authentication token. Format is'Bearer: tokenvalue' and is required.
  #      
  # @returns JSON Object  
  # @throws JSON Object of Errors
  def destroy 
    @user = User.find(params[:id])
    if @user.destroy
      render json: { deleted_id: params[:id].to_i }
    else 
      render json: @user.errors
    end 
  end  

  private

    def user_params
      params.require(:user).permit(:email, :name, :username, :password, :password_confirmation)
    end

end
