# app/controllers/base_controller.rb
class BaseController < ActionController::Base
  include ActionController::ImplicitRender
  respond_to :json

  before_filter :authenticate_user_from_token!

  # Return the standard error as json
  rescue_from StandardError do |exception|
    render custom_err({general: [exception.to_s]})
  end

  protected

    # @params {Hash} errors key value errors
    # @returns Json Object with Errors and Status.
    def custom_err(errors)
      return :json => {
        errors: errors,
        status: 422,
      },
      status: :unprocessable_entity

    end

    # Returns The currently logged in user
    #
    # @returns {ActiveRecord} User instance
    def current_user
      if token_from_request.blank?
        nil
      else
        authenticate_user_from_token!
      end
    end
    alias_method :devise_current_user, :current_user

    # Whether or not the user is logged in.
    #
    # @returns boolean
    def user_signed_in?
      !current_user.nil?
    end
    alias_method :devise_user_signed_in?, :user_signed_in?

    # Whether the current token matches the user's 
    # email / password combination.
    #
    # @returns {ActiveRecord} User instance
    def authenticate_user_from_token!
      if claims and user = User.find_by(email: claims[0]['user']) and user.valid_password?(claims[0]['password'])
        @current_user = user
      else
        return render_unauthorized
      end
    end

    # Decodes your username and password from the token
    def claims
      JWT.decode(token_from_request, "YOURSECRETKEY", true)
    rescue
      nil
    end

    # Endcodes your User and Password into a token that last 2 weeks.
    #
    # @params {string} user hash
    # @params {string} password
    # @returns {string} - The encoded token
    def jwt_token user, password
      # 2 Weeks
      expires = Time.now.to_i + (3600 * 24 * 14)
      JWT.encode({:user => user.email, :password => password, :exp => expires}, "YOURSECRETKEY", 'HS256')
    end

    # Renders an error response if unauthorized
    def render_unauthorized(payload = { errors: { unauthorized: ["You are not authorized perform this action."] } })
      render json: payload, status: 401
    end

    # Renders an error response if not found
    def render_not_found(type, id, option='id')
      payload = { errors: { general: ["Could not find #{type} with '#{option}'=#{id}"] } }
      render json: payload, status: 404
    end    

    # Returns a token for the logged in user
    #
    # @returns {string}
    def token_from_request
      # Accepts the token either from the header or a query var
      # Header authorization must be in the following format
      # Authorization: Bearer {yourtokenhere}
      auth_header = request.headers['Authorization'] and token = auth_header.split(' ').last
      if(token.to_s.empty?)
        token = request.parameters["token"]
      end

      token
    end
    
    # #
    # # Permission functions
    # #

    # Makes sure the current user has edit access to the user requested
    #
    # @params {integer} id The manufacturer ID
    def block_if_not_current_user(id)

      render_unauthorized errors: {
        permissions: ["You do not have permission to view / edit"]
      } unless current_user.id == id

    end

    # # Makes sure the current user has edit access to the editorship
    # #
    # # @params {integer} id The editorship ID
    # def block_editorship_non_editors(id)
    #   manufacturer_id = Editorship.find(id).manufacturer.id
    #   block_manufacturer_non_editors(manufacturer_id)

    # end

    # Sets the User as the Current User
    def set_user
      @user = current_user
    end
end