<template>
    <h1>Bienvenido al Dashboard</h1>
    <h2 v-if="user">Bienvenido al programa de Finanzas Personales,<br> {{ user.displayName }} </h2>
    <div v-if="chartData && chartData.labels.length > 0">
        <BarChart :chartData="chartData" />
    </div>
</template>

<script setup>
import { useAuth } from "@/composables/useAuth.js";
import { getDatabase, ref as dbRef, onValue } from "firebase/database";
import { onMounted, ref } from 'vue'
import { auth } from "@/firebase";
import { onAuthStateChanged } from "firebase/auth";
import BarChart from "../components/BarChart.vue";

const { user } = useAuth()

const chartData = ref({
    labels: [],
    datasets: [
        {
            label: "Gastos",
            backgroundColor: "rgb(255, 99, 132)",
            data: []
        },
        {
            label: "Ingresos",
            backgroundColor: "rgb(54, 162, 235)",
            data: []
        }
    ]
})

// Inicializar la base de datos
const db = getDatabase();

// Función para obtener los datos de las transacciones
const fetchData = (userUid) => {
    const transactionsRef = dbRef(db, `transactions/${userUid}`);

    onValue(transactionsRef, (snapshot) => {
        const data = snapshot.val();
        if (!data) return console.log("No hay datos");

        const labels = [];
        const ingresos = [];
        const gastos = [];

        for (const key in data) {
            const { type, amount, date } = data[key];
            labels.push(new Date(date).toLocaleDateString());

            if (type === 'ingresos') {
                ingresos.push(amount);
            } else if (type === 'gasto') {
                gastos.push(amount);
            }
        }

        chartData.value.labels = labels;
        chartData.value.datasets[0].data = gastos;
        chartData.value.datasets[1].data = ingresos;
    });
}

onMounted(() => {
    onAuthStateChanged(auth, (user) => {
        if (user) {
            const userUid = auth.currentUser.uid;
            fetchData(userUid);
        } else {
            console.log("No hay un usuario autenticado");
        }
    });
})
</script>
