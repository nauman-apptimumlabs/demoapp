class AddStatusToYouga < ActiveRecord::Migration[7.0]
  def change
    add_column :yougas, :status, :integer, default: 0
  end
end
