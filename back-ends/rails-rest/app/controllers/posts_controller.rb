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
  def index(posts = nil)
    if !params[:url_path].blank?
      @post = Post.find_by(:url_path => params[:url_path])
      render 'posts/show'
    else 
      if posts 
        @posts = posts
      else 
        @posts = Post.all 
      end
      
      @viewable_posts = []
      @posts.each do |post|

        # Make  JSON Copy (This is a special case so that we can render :tags as an array of IDs)
        post_copy = post.as_json
        post_copy[:date_created] = post.created_at
        post_copy[:date_updated] = post.updated_at

        # Add Tags to our new Hash
        add_post_tags(post_copy)

        # Add the post hash to the array
        @viewable_posts << post_copy
      end 

      render json: @viewable_posts
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
    postTags = PostTag.where(:tag_id => params[:tag_id])
    posts = []

    postTags.each do |t|
      posts << t.post_id
    end 

    @posts = Post.where("id IN (?)", posts)
    index(@posts) 
  end

  # @description GET /users/:user_id/posts
  # @return {Object} posts - JSON Object of the Post 
  # @param {String} user_id - The user's id  
  def get_post_by_user
    @posts = Post.where(:user_id => params[:user_id])
    index(@posts)
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

    # @description (Mutator Method) Add Post Tags to a Hash based on the ID  
    # @param {Hash} current_post - Gets Tags from PostTag Relationships and Adds those Tag's ID's to the hash
    def add_post_tags(current_post)
      # set tags as an array (we'll add each tag to it below)
      current_post["tags"] = []

      # Get a list of the PostTag Relationships
      postTags = PostTag.where(:post_id => current_post["id"].to_i)
      
      # For each Post Tag, add the tag to the array of tags
      postTags.each do |post_tag|
        current_post["tags"] << post_tag.tag_id.to_s
      end
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
