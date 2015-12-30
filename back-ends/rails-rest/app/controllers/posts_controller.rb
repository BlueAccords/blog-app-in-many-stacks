class PostsController < BaseController
  before_action :set_user
  before_filter :ensure_post_exists, only: :show
  before_filter :check_url_path, only: :create
  before_filter :ensure_user_exists, only: :get_post_by_user
  skip_before_filter :authenticate_user_from_token!, :except => [:create, :update, :delete]

  # @description GET /posts   
  # @return {Object} posts - JSON Object of the Post 
  # @param {String} url_path - Searches for a particular post with url_path
  # @param {String} Authorization - Authentication token. Format is'Bearer: tokenvalue' and is required.
  def index
    if !params[:url_path].blank?
      @post = Post.where(:url_path => params[:url_path])
      render 'posts/show'
    else 
      @posts = Post.all 
      'posts/index'
    end 
  end

  # @description POST /posts   
  # @return {Object} post - JSON Object of the Post 
  # @param {String} title - The Title of the Post. Required.
  # @param {String} body - The Body of the Post. Required.
  def create
    @post = @user.posts.create(post_params)
    @post.url_path = @url_path 

    # Successful JSON in /views/posts/create.json.rabl

    # On Error /views/helpers/error
    respond_with @post do 
      'helpers/errors' unless @post.save
    end
  end

  # @description GET /posts/:id   
  # @return {Object} post - JSON Object of the Post 
  def show
    @post = Post.find(params[:id]) 
  end

  # @description GET /tags/:tag_id/posts 
  # @return {Object} post - JSON Object of the Post 
  def get_post_by_tag
    # TO DO -> Make after 
  end

  # @description GET /users/:user_id/posts
  # @return {Object} posts - JSON Object of the Post 
  # @param {String} user_id - The user's id  
  def get_post_by_user
    puts params[:user_id]
    @posts = Post.where(:user_id => params[:user_id])
    render 'posts/index'
  end

  # @description PUT /users/:id
  # @param {Int} id - User's id. Implicit Paramater. Is required.  
  # @param {String} Authorization - Authentication token. Format is'Bearer: tokenvalue' and is required.
  #      
  # @returns JSON Object of User 
  # @throws JSON Object of Errors
  def update
    @post = Post.find(params[:id])

    updates = post_params.as_json
  
    if @post.update(updates)
      render 'posts/show'
    else
      respond_with @post do 
        'helpers/errors'
      end
    end
  end

  # @description DELETE /posts/:id 
  # @param {string} id - Post's id. Implicit Paramater. Is required.  
  # @param {string} Authorization - Authentication token. Format is'Bearer: tokenvalue' and is required.
  #      
  # @returns JSON Object with deleted_id
  # @throws JSON Object of Errors
  def destroy 
    post = Post.find(params[:id])
    if post.destroy
      render json: { deleted_id: params[:id].to_i }
    else 
      render json: post.errors
    end 
  end 

  private

    def post_params
      # Rails escapes by default, so we only permit those.
      params.require(:post).permit(:title, :body, :user_id, :url_path)
    end

    # Make sure post exists.  That way if not, we can throw a 404
    def ensure_post_exists
      begin
        Post.find(params[:id])
      rescue
        render_not_found('post', (params[:id]))
      end
    end   

    # Make sure user exists.  That way if not, we can throw a 404
    def ensure_user_exists
      begin
        User.find(params[:user_id])
      rescue
        render_not_found('user', (params[:user_id]))
      end
    end    

    def check_url_path
      if params[:post].has_key?(:url_path) 
        @url_path = (params[:post][:url_path]).to_s.parameterize
      else  
        @url_path = (params[:post][:title]).to_s.parameterize + '-' + Time.now.utc.iso8601
      end
    end

end
