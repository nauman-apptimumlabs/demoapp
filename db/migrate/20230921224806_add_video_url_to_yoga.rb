class AddVideoUrlToYoga < ActiveRecord::Migration[7.0]
  def change
    add_column :yougas, :video_url, :string
  end
end
