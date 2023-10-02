require "test_helper"

class Api::V1::UsersControllerTest < ActionDispatch::IntegrationTest
  test "should get sign_up" do
    get api_v1_users_sign_up_url
    assert_response :success
  end

  test "should get sign_in" do
    get api_v1_users_sign_in_url
    assert_response :success
  end
end
