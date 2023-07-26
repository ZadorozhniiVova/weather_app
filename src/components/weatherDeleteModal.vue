
<template>
  <div class="modal-container" :class="{ show: isDeleteModal }">
    <div class="modal-content">
      <p>Are you sure you want to delete the item?</p>
      <div class="modal-buttons">
        <button class="modal-confirm" @click="deleteItem">Delete</button>
        <button class="modal-cancel" @click="closeModal">Cancel</button>
      </div>
    </div>
  </div>
</template>

<script>
import bus from 'vue3-eventbus'

export default {
  data() {
    return {
      isDeleteModal: bus.on('isDeleteModal', (data) => {
        this.isDeleteModal = data.isDeleteModal
      }),
      cityName: bus.on('cityName', (data) => {
        this.cityName = data.cityName
      }),
      favorites: localStorage.getItem('favorite')
    }
  },
  methods: {
    showConfirmationModal(index) {
      this.itemIndexToDelete = index
      this.showModal = true
    },
    closeModal() {
      bus.emit('isDeleteModal', { isDeleteModal: false })
    },
    deleteItem() {
      let favorites = this.favorites.split(',')
      let filterFavorites = favorites.filter((item) => item !== this.cityName).join(',')
      this.favorites = filterFavorites
      localStorage.setItem('favorite', filterFavorites)
      bus.emit('isDeleteModal', { isDeleteModal: false })
      this.$router.go(0)
    }
  }
}
</script>

<style>
.modal-container {
  top: 0;
  left: 0;
  position: fixed;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: -1;
  transition: 0.3s ease-in-out;
  opacity: 0;
}
.modal-container.show {
  opacity: 1;
  z-index: 150;
}
.modal-content {
  padding: 40px 20px 20px;
  background: rgba(255, 255, 255, 0.8);
  gap: 20px;
  border-radius: 15px;
  top: 50%;
  left: 50%;
  z-index: 100;
  transform: translate(-50%, -50%);
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  flex-direction: column;
}

.modal-content p {
  color: black;
}

.modal-buttons {
  display: flex;
  justify-content: center;
  gap: 20px;
}

.modal-buttons button {
  font-size: 15px;
  margin: 15px;
  padding: 10px 20px;
  color: white;
  border-radius: 10px;
  border-color: transparent;
  cursor: pointer;
  transition: background-color 0.5s ease-in-out;
}

.modal-cancel {
  background: rgba(235, 38, 50, 0.6);
}

.modal-cancel:hover {
  background-color: rgb(235, 38, 50);
}

.modal-confirm {
  background: rgba(66, 184, 131, 0.6);
}

.modal-confirm:hover {
  background-color: rgb(66, 184, 131);
}
</style>
