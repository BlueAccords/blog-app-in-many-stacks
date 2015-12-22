class CreateTaggings < ActiveRecord::Migration
  def change
    create_table :taggings do |t|
      # Associations 
      t.belongs_to :tag, null: false
      t.belongs_to :post, null: false

      # Unique Constraints
      t.index [:post_id, :tag_id], unique: true 
      
      t.timestamps null: false
    end
  end
end
