import { defineStore } from "pinia";
import { ref, computed, toRaw } from "vue";
export const useTeamStore = defineStore("team", () => {
  const count = ref(0);
  function increment() {
    count.value++;
  }

  const team = ref([
    { name: "Matt Cross" },
    { name: "Matt Clement" },
    { name: "Jenny Blackett" },
    { name: "Grace Jandrall" },
    { name: "Arun Bradley" },
    { name: "Emma Wiggett" },
    { name: "Ricky de Sousa" }
  ]);

  const log = ref([]);

  const teamStats = computed(() => {
    let result = [];
    team.value.forEach((player) => {
      let playerData = log.value.filter((x) => x.playerName === player.name);
      playerData = JSON.parse(JSON.stringify(playerData));
      const goals = playerData.filter((x) => x.action === "goal").length;
      const missed = playerData.filter((x) => x.action === "miss").length;
      const shots = goals + missed;
      result.push({
        name: player.name,
        shots: shots,
        missed: missed,
        shootingPercentage: Math.round((goals / shots || 0) * 100)
      });
    });

    return result;
  });

  return { count, increment, team, log, teamStats };
});
