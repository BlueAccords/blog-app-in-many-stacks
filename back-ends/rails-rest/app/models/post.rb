class Post < ActiveRecord::Base
  belongs_to :user

  validates :title, presence: true
  validates :body, presence: true
  validates_uniqueness_of :url_path 


  has_many :post_tags, dependent: :destroy
  has_many :tags, through: :post_tags
  has_many :comments, dependent: :destroy
end
