class GroupsController < ApplicationController
  before_action :set_group, only: [:edit, :update]

  def edit
  end

  def update
    @group.update(groups_params)
    if @group.save
      redirect_to root_path, notice: 'グループを編集しました'
    else
      render :edit
    end
  end

  def show
  end

  def new
    @group = Group.new
  end

  def create
    @group = Group.create(groups_params)
    if @group.save
      redirect_to root_path, notice: 'グループを作成しました'
    else
      render :new
    end
  end

  private
  def groups_params
    params.require(:group).permit(:name, { :user_ids => [] })
  end

  def set_group
    @group = Group.find(params[:id])
  end
end
